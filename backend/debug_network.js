const dns = require('dns');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
console.log('Testing connection to:', uri.replace(/:([^@]+)@/, ':****@')); // Hide password

// 1. Test DNS
const hostname = 'cluster0.i9lexj3.mongodb.net';
console.log(`\n1. Resolving DNS for ${hostname}...`);

dns.resolveSrv(`_mongodb._tcp.${hostname}`, (err, addresses) => {
    if (err) {
        console.error('DNS SRV Resolution Failed:', err);
    } else {
        console.log('DNS SRV Records:', addresses);
    }
});

// 2. Test Mongoose Connection (Standard)
async function testConnection() {
    console.log('\n2. Testing Standard Mongoose Connection...');
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Standard Connection SUCCESS!');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Standard Connection FAILED:', err.message);
    }

    // 3. Test Mongoose with IPv4
    console.log('\n3. Testing Mongoose with family: 4 (IPv4 only)...');
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log('IPv4 Connection SUCCESS!');
        await mongoose.disconnect();
    } catch (err) {
        console.error('IPv4 Connection FAILED:', err.message);
    }
}

testConnection();
