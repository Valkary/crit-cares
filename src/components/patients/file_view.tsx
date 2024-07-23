"use client";

export default function FileView({ file_url }: { file_url: string }) {
    return <iframe id="serviceFrameSend" src={file_url} className="w-full h-full" />
}
