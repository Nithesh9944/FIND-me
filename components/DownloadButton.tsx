"use client";

import { useState } from "react";
import { incrementDownloadCount } from "@/lib/supabase/queries";

export default function DownloadButton({ versionId, apkPath }: { versionId: string; apkPath: string }) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    await incrementDownloadCount(versionId);
    window.open(apkPath, "_blank", "noopener,noreferrer");
    setDownloading(false);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className="w-full rounded-xl bg-coral px-5 py-4 text-base font-bold text-white transition hover:bg-coral/85 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
    >
      {downloading ? "Preparing download..." : "Download APK"}
    </button>
  );
}
