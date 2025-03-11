import React, { useContext, useEffect, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AuthContext } from '@/context/AuthContext';
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Crown, WalletCards, X, Loader2 } from 'lucide-react';
import axios from 'axios';
import Razorpay from 'razorpay';

function Profile({ openDialog, onClose }: { openDialog: boolean; onClose: () => void }) {
    const { user } = useContext(AuthContext);
    const [maxToken, setMexToken] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user?.orderId) {
            setMexToken(500000);
        } else {
            setMexToken(10000);
        }
    }, [user?.orderId]); // Add dependency here

    useEffect(()=>{
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            console.log('Razorpay script loaded');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    })
    const GenerateSubscriptionId = async () => {
        try {
            setLoading(true);
            setError(null); // Reset error state
            const response = await axios.post('/api/create-subscription');
            console.log(response?.data.result.id);
            MakePayment(response?.data.result.id)
        } catch (error) {
            console.error(error);
            setError('Failed to generate subscription. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const MakePayment=(subscriptionId:string)=>{

        let options ={
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            subscription_id: subscriptionId,
            name:"AI Personal Assistant",
            description:"Upgrade to premium",
            image:"/logo.svg",
            handler:function (response:any){
                console.log(response);
            },
            "prefill":{email:user?.email,name:user?.name},
            notes:{
                merchant_order_id:"123123"
            },
            theme:{color:"#000000"},
        }

        //@ts-ignore
        const rzp1 = new window.Razorpay(options);
        rzp1.open();

    }

    return (
        <Dialog open={openDialog} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden">
                <DialogHeader className="bg-card px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold">Profile</DialogTitle>
                        <DialogClose aria-label="Close" className="rounded-full hover:bg-accent p-1.5 transition-colors">
                        </DialogClose>
                    </div>
                </DialogHeader>

                <div className="px-6 py-5 space-y-6">
                    {/* Profile Section */}
                    <div className="flex items-start gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full blur opacity-75"></div>
                            <Image
                                src={user?.picture}
                                alt="User profile"
                                width={150}
                                height={150}
                                className="relative rounded-full w-16 h-16 object-cover border-2 border-background"
                                priority
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-foreground">{user?.name}</h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>

                    {/* Usage Section */}
                    <div className="space-y-4 bg-accent/50 rounded-lg p-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium">Token Usage</h3>
                                <span className="text-sm text-muted-foreground">{user?.credits}/{maxToken}</span>
                            </div>
                            <Progress value={(user?.credits / (maxToken || 1)) * 100} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium">Current Plan</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium
                                ${user?.orderId 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'bg-muted text-muted-foreground'}`}>
                                {user?.orderId ? 'Premium' : 'Free'}
                            </span>
                        </div>
                    </div>

                    {/* Pro Plan Card */}
                    <div className="space-y-4">
                        <div
                            className="border border-border rounded-xl p-4 space-y-3 bg-card hover:border-primary/50 transition-colors cursor-pointer"
                            
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Crown className="h-5 w-5 text-primary" />
                                    <h2 className="font-semibold text-lg">Pro Plan</h2>
                                </div>
                                <span className="text-sm text-muted-foreground">500,000 Tokens</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold">$8</span>
                                <span className="text-muted-foreground">/month</span>
                            </div>
                        </div>

                        <Button className="w-full gap-2 h-11" onClick={GenerateSubscriptionId}>
                            {
                                loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <WalletCards className="w-4 h-4" />
                                        Upgrade to Pro
                                    </>
                                )
                            }
                        </Button>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Profile;











