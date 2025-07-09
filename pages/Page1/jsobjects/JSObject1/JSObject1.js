export default {
  async uploadAndShare() {
    // 1. Jalankan upload
    await UploadAPI_0.run();

    // 2. Ambil ID yang valid dari .data dan simpan sekali
    const fileId = UploadAPI_0.data.id;

    // 3. Buat URL Google Drive (langsung dari variabel, bukan UploadAPI_0.data lagi)
    const driveUrl = "https://drive.google.com/file/d/" + fileId + "/view?usp=sharing";

    // 4. Ambil input
    const input = Input1.text.trim();

    // 5. Share logic
    if (!input) {
      await ShareNonPublic_0.run({
        role: "reader",
        type: "anyone"
      });

      // 6. Gunakan driveUrl dari variabel, jangan ulang akses UploadAPI_0.data.id
      return tinyUrl_nonPub.run({
        url: driveUrl,
        domain: "tinyurl.com"
      });
    }

    // 7. Jika ada email
    const emails = input.split(",").map(e => e.trim());

    await Promise.all(
      emails.map(email =>
        ShareNonPublic_0.run({
          role: "reader",
          type: "user",
          emailAddress: email
        })
      )
    );

    // 8. Gunakan driveUrl dari variabel (bukan UploadAPI_0.data.id lagi)
    return tinyUrl_nonPub.run({
      url: driveUrl,
      domain: "tinyurl.com"
    });
  }
}
