import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 8787);

const STORE_EMAIL =
  process.env.STORE_EMAIL || 'huzafakareem479@gmail.com';

const STORE_PHONE =
  process.env.STORE_PHONE || '03252331785';

const RESEND_API_KEY =
  process.env.RESEND_API_KEY || '';

const FROM_EMAIL =
  process.env.FROM_EMAIL ||
  'Komorebi Wear <onboarding@resend.dev>';

const ordersDir = path.join(__dirname, 'data');
const ordersFile = path.join(ordersDir, 'orders.json');

const app = express();

app.use(express.json({ limit: '100kb' }));


// ===============================
// ORDER FUNCTIONS
// ===============================

async function readOrders() {
  try {
    return JSON.parse(
      await fs.readFile(ordersFile, 'utf8')
    );
  } catch {
    return [];
  }
}


async function writeOrders(orders) {
  await fs.mkdir(ordersDir, { recursive: true });

  await fs.writeFile(
    ordersFile,
    JSON.stringify(orders, null, 2),
    'utf8'
  );
}


function clean(value, max = 500) {
  return String(value ?? '')
    .trim()
    .slice(0, max);
}


function makeOrderNumber() {
  return `KM-${new Date().getFullYear()}-${crypto
    .randomBytes(3)
    .toString('hex')
    .toUpperCase()}`;
}


function money(n) {
  return `Rs. ${Number(n || 0).toLocaleString('en-PK')}`;
}


// ===============================
// RESEND EMAIL
// ===============================

async function sendStoreEmail(order) {

  // Check API key
  if (!RESEND_API_KEY) {

    console.error(
      'RESEND ERROR: RESEND_API_KEY is not configured in .env'
    );

    return {
      sent: false,
      reason: 'RESEND_API_KEY not configured'
    };
  }


  const itemLines = order.items
    .map(
      i =>
        `${i.name} | Size ${i.size} | Qty ${i.quantity} | ${money(
          i.price * i.quantity
        )}`
    )
    .join('\n');


  const text = [
    `New Komorebi Wear COD Order`,
    `Order Number: ${order.orderNumber}`,
    '',
    `Customer Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Email: ${order.customer.email || 'Not provided'}`,
    `City: ${order.customer.city}`,
    `Address: ${order.customer.address}`,
    `Notes: ${order.customer.notes || 'None'}`,
    '',
    '==============================',
    'ORDER ITEMS',
    '==============================',
    itemLines,
    '',
    `Subtotal: ${money(order.subtotal)}`,
    `Delivery: ${money(order.shipping)}`,
    `Total to Collect: ${money(order.total)}`,
    '',
    'Payment Method: Cash on Delivery',
    '',
    `Store Phone: ${STORE_PHONE}`
  ].join('\n');


  console.log('');
  console.log('==============================');
  console.log('SENDING RESEND EMAIL');
  console.log('==============================');

  console.log('From:', FROM_EMAIL);
  console.log('To:', STORE_EMAIL);
  console.log('Order:', order.orderNumber);


  try {

    const response = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          from: FROM_EMAIL,

          to: [STORE_EMAIL],

          subject:
            `New COD Order ${order.orderNumber} — ${order.customer.name}`,

          text
        })
      }
    );


    // Read Resend response
    const result = await response
      .json()
      .catch(() => ({}));


    console.log('');
    console.log('RESEND RESPONSE STATUS:', response.status);
    console.log('RESEND RESPONSE:', result);


    if (!response.ok) {

      const errorMessage =
        result?.message ||
        result?.error ||
        `Email provider returned ${response.status}`;

      throw new Error(errorMessage);
    }


    console.log('');
    console.log('✅ RESEND EMAIL SENT SUCCESSFULLY');
    console.log('Email ID:', result?.id || 'No ID returned');
    console.log('');


    return {
      sent: true,
      id: result?.id || null
    };

  } catch (error) {

    console.error('');
    console.error('❌ RESEND EMAIL ERROR:');

    console.error(
      error instanceof Error
        ? error.message
        : error
    );

    console.error('');


    throw error;
  }
}


// ===============================
// HEALTH CHECK
// ===============================

app.get('/api/health', (_req, res) => {

  res.json({
    ok: true,
    store: 'Komorebi Wear',
    payment: 'Cash on Delivery'
  });

});


// ===============================
// CREATE ORDER
// ===============================

app.post('/api/orders', async (req, res) => {

  try {

    const body = req.body || {};

    const customer = body.customer || {};

    const items = Array.isArray(body.items)
      ? body.items
      : [];


    // Validate order
    if (
      !clean(customer.name, 100) ||
      !clean(customer.phone, 30) ||
      !clean(customer.address, 600) ||
      !items.length
    ) {

      return res.status(400).json({
        message:
          'Name, phone, address and at least one product are required.'
      });

    }


    // Clean products
    const safeItems = items.map(i => ({

      id: clean(i.id, 50),

      name: clean(i.name, 160),

      size: clean(i.size, 10),

      color: clean(i.color, 50),

      quantity: Math.max(
        1,
        Math.min(
          20,
          Number(i.quantity) || 1
        )
      ),

      price: Math.max(
        0,
        Number(i.price) || 0
      )

    }));


    // Calculate total on server
    const subtotal = safeItems.reduce(
      (sum, i) =>
        sum + i.price * i.quantity,
      0
    );


    const shipping =
      subtotal >= 15000
        ? 0
        : 250;


    const total =
      subtotal + shipping;


    // Create order
    const order = {

      orderNumber:
        makeOrderNumber(),

      createdAt:
        new Date().toISOString(),

      paymentMethod:
        'Cash on Delivery',

      customer: {

        name:
          clean(customer.name, 100),

        phone:
          clean(customer.phone, 30),

        email:
          clean(customer.email, 160),

        city:
          clean(customer.city, 80) ||
          'Karachi',

        address:
          clean(customer.address, 600),

        notes:
          clean(customer.notes, 500)

      },

      items:
        safeItems,

      subtotal,

      shipping,

      total

    };


    // Save order
    const orders =
      await readOrders();

    orders.push(order);

    await writeOrders(orders);


    console.log('');
    console.log('==============================');
    console.log('NEW COD ORDER');
    console.log('==============================');
    console.log(
      'Order Number:',
      order.orderNumber
    );
    console.log(
      'Customer:',
      order.customer.name
    );
    console.log(
      'Phone:',
      order.customer.phone
    );
    console.log(
      'Total:',
      money(order.total)
    );
    console.log('==============================');


    // Send email
    let email = {
      sent: false
    };


    try {

      email =
        await sendStoreEmail(order);

      console.log(
        'RESEND EMAIL RESULT:',
        email
      );

    } catch (err) {

      console.error(
        'RESEND EMAIL ERROR:',
        err
      );

      email = {

        sent: false,

        reason:
          err instanceof Error
            ? err.message
            : 'Email failed'

      };

    }


    // Return success to website
    res.status(201).json({

      ok: true,

      orderNumber:
        order.orderNumber,

      total,

      emailSent:
        email.sent

    });


  } catch (error) {

    console.error(
      'ORDER ERROR:',
      error
    );


    res.status(500).json({

      message:
        'Order could not be placed. Please try again.'

    });

  }

});


// ===============================
// ADMIN ORDERS
// ===============================

app.get('/api/orders', async (req, res) => {

  if (
    !process.env.ADMIN_TOKEN ||
    req.get('x-admin-token') !==
      process.env.ADMIN_TOKEN
  ) {

    return res.status(401).json({
      message: 'Unauthorized'
    });

  }


  res.json(
    await readOrders()
  );

});


// ===============================
// FRONTEND BUILD
// ===============================

const distDir =
  path.join(__dirname, 'dist');


app.use(
  express.static(distDir)
);


app.get('*', async (_req, res) => {

  try {

    res.sendFile(
      path.join(
        distDir,
        'index.html'
      )
    );

  } catch {

    res.status(404).send(
      'Build not found. Run npm run build first.'
    );

  }

});


// ===============================
// START SERVER
// ===============================

app.listen(
  PORT,
  () => {

    console.log('');
    console.log(
      '================================'
    );

    console.log(
      'Komorebi Wear Backend Started'
    );

    console.log(
      `Server: http://localhost:${PORT}`
    );

    console.log(
      'Payment: Cash on Delivery'
    );

    console.log(
      'Store Email:',
      STORE_EMAIL
    );

    console.log(
      'Resend API Key Loaded:',
      Boolean(RESEND_API_KEY)
    );

    console.log(
      '================================'
    );

  }
);