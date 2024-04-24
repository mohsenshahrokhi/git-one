/* import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css"
import { OurFileRouter } from "@/app/api/uploadthing/core";

export const Upload_btn = () => (
    <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
        }}
    />
); */
"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
// import "@uploadthing/react/styles.css";

import { UploadButton } from "@/utils/uploadthing";

export default function Upload_btn() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UploadButton

                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </main>
    );
}