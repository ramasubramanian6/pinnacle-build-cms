const verifyViaOtpApi = async () => {
    console.log('Checking via Send OTP API...');
    try {
        const response = await fetch('http://localhost:5001/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'ramasubramanianponni37@gmail.com',
                type: 'signup'
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data));

        if (response.status === 400 && data.message.includes('already registered')) {
            console.log('✅ USER FOUND: Email is already registered.');
        } else if (response.status === 200) {
            console.log('❌ USER NOT FOUND: OTP sent successfully (meaning user can sign up).');
        } else {
            console.log('❓ STATUS:', response.status, data);
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
};

verifyViaOtpApi();
