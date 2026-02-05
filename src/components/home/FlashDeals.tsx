import { motion } from "framer-motion";
import { Timer, Tag, Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FlashDeals = () => {
    return (
        <section className="py-12 bg-secondary border-y border-border relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-accent rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 md:mb-12">
                    <div className="text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-accent font-medium uppercase tracking-wider text-sm mb-2"
                        >
                            <Timer className="w-4 h-4 animate-pulse" />
                            <span>Limited Time Offer</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-4xl md:text-5xl font-bold text-foreground flex items-center gap-3"
                        >
                            Flash <span className="text-accent">Deals</span>
                            <Sparkles className="w-8 h-8 text-accent fill-accent animate-pulse" />
                        </motion.h2>
                    </div>

                    {/* Timer or CTA could go here */}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Deal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-background rounded-2xl border border-accent/20 p-1 relative group overflow-hidden shadow-lg shadow-accent/5 hover:shadow-accent/10 transition-all"
                    >
                        {/* Ribbon */}
                        <div className="absolute top-4 right-4 z-20">
                            <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                80% OFF
                            </span>
                        </div>

                        <div className="bg-card rounded-xl p-6 h-full flex flex-col relative z-10">
                            <div className="mb-4">
                                <div className="text-accent font-medium text-sm border border-accent/20 rounded-full px-3 py-1 bg-accent/5 inline-block mb-3">
                                    Premium
                                </div>
                                <h3 className="font-display text-2xl font-bold text-foreground">Premium10</h3>
                                <p className="text-muted-foreground text-sm mt-2">Get access to premium construction consultation features.</p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-border">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-4xl font-bold text-foreground">₹100</span>
                                    <span className="text-lg text-muted-foreground line-through">₹1,000</span>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-accent" />
                                        <span>Priority Support</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-accent" />
                                        <span>Detailed BOQ Estimation</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-foreground/80">
                                        <Check className="w-4 h-4 text-accent" />
                                        <span>Site Visit Consultation</span>
                                    </li>
                                </ul>

                                <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold group">
                                    Claim Offer
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
