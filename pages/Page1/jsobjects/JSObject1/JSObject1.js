export default {
	async uploadAndShare() {
		// 1. Jalankan upload ke Google Drive
		await UploadAPI_0.run();

		// 2. Ambil ID file yang valid dari .data
		const fileId = UploadAPI_0.data.id;

		// 3. Buat link Google Drive dari ID
		const driveUrl = "https://drive.google.com/file/d/" + fileId + "/view?usp=sharing";

		// 4. Ambil input dari user (bisa kosong atau berisi email)
		const input = Input1.text.trim();

		// 5. Jika input kosong → share ke publik (anyone can view)
		if (!input) {
			await ShareNonPublic_0.run({
				role: "reader",
				type: "anyone"
			});

			return tinyUrl_nonPub.run({
				url: driveUrl,
				domain: "tinyurl.com"
			});
		}

		// 6. Kalau ada input → ambil semua email dan tambahkan email user login
		const emails = [
			...input.split(",").map(e => e.trim()),
			appsmith.user.email
		];

		// 7. Share file ke semua email satu per satu
		await Promise.all(
			emails.map(email =>
								 ShareNonPublic_0.run({
				role: "reader",
				type: "user",
				emailAddress: email
			})
								)
		);

		// 8. Setelah share selesai, buat short link TinyURL
		return tinyUrl_nonPub.run({
			url: driveUrl,
			domain: "tinyurl.com"
		});
	}
}
