import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
    try {
        // Validate environment variables
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET || !process.env.RAZORPAY_PLAN_ID) {
            console.error("Missing Razorpay configuration");
            return NextResponse.json(
                { error: "Missing Razorpay configuration" },
                { status: 500 }
            );
        }

        // Initialize Razorpay instance
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Create subscription
        const result = await instance.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 12,
            quantity: 1,
            start_at: Math.floor(Date.now() / 1000), // Current timestamp in seconds
            addons: [],
            notes: {
                price: "799"  // for reference
            }
        });

        // Return success response
        return NextResponse.json({ result });
    } catch (error: any) {
        console.error('Subscription creation error:', error);
        if (error.response) {
            console.error('Razorpay API response:', error.response.data);
        }
        return NextResponse.json(
            { error: error.message || 'Failed to create subscription' },
            { status: error.status || 500 }
        );
    }
    
}

