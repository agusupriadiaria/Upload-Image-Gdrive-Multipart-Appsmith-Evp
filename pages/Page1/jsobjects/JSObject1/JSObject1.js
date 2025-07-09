export default {
  async uploadAndShare() {
    // 1. Upload file ke Drive
    const uploaded = await UploadAPI_0.run();
    const fileId = uploaded.id;

    // 2. Ambil email dari Input
    const input = Input1.text.trim();

    // 3. Share ke publik jika kosong
    if (!input) {
      return ShareNonPublic_0.run({
        role: "reader",
        type: "anyone"
      });
    }

    // 4. Jika isi → kirim satu per satu
    const emails = input.split(",").map(e => e.trim());

    return Promise.all(
      emails.map(email =>
        ShareNonPublic_0.run({
          role: "reader",
          type: "user",
          emailAddress: email
        })
      )
    );
  }
}
