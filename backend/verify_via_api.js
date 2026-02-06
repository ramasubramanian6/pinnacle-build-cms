const verifyViaApi = async () => {
    console.log('Checking via API...');
    try {
        const response = await fetch('http://localhost:5001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: 'Test User',
                email: 'ramasubramanianponni37@gmail.com',
                password: 'password123',
                otp: '123456', // Mock OTP, might fail if OTP verification is strict but let's see response
                phone: '1234567890'
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data));

        if (response.status === 400 && data.message === 'User already exists') {
            console.log('✅ CONCLUSION: User ALREADY EXISTS in DB.');
        } else if (response.status === 400 && data.message === 'Invalid or expired OTP') {
            console.log('❓ CONCLUSION: OTP check failed first. User MIGHT exist, but we hit OTP barrier.');
            // If OTP check fails, it means we can't easily check existence via register unless we verify OTP first.
            // BUT, let's check authController.js order.
        } else {
            console.log('❓ CONCLUSION: Uncertain.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
};

verifyViaApi();
