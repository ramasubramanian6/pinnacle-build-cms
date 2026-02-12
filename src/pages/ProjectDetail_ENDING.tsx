
                        </div >
                    </aside >
                </div >
            </div >
        </section >

    {/* Phone Modal */ }
    < Dialog open = { showPhoneModal } onOpenChange = { setShowPhoneModal } >
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Contact Number Required</DialogTitle>
                <DialogDescription>
                    Please provide your phone number so our team can reach you regarding this project.
                </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2 py-4">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="phone" className="sr-only">Phone Number</Label>
                    <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        type="tel"
                    />
                </div>
            </div>
            <DialogFooter className="sm:justify-start">
                <Button type="button" variant="secondary" onClick={() => setShowPhoneModal(false)}>Cancel</Button>
                <Button type="button" onClick={handlePhoneSubmit} disabled={submitting}>{submitting ? "Saving..." : "Submit"}</Button>
            </DialogFooter>
        </DialogContent>
            </Dialog >

    {/* Video Player Modal */ }
    < Dialog open = {!!selectedVideo} onOpenChange = {(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
            <div className="relative aspect-video w-full">
                {selectedVideo && (isDirectVideo(selectedVideo) ? (
                    <video
                        src={selectedVideo}
                        controls
                        autoPlay
                        className="w-full h-full"
                        controlsList="nodownload"
                    />
                ) : (
                    <iframe
                        src={getEmbedUrl(selectedVideo)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ))}
            </div>
        </DialogContent>
            </Dialog >
            </Layout >
        </>
    );
};

export default ProjectDetail;
