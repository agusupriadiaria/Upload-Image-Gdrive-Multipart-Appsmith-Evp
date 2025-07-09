export default {
	async uploadAndShare() {
		try {
			// 1. Upload file ke Drive
			const uploaded = await UploadAPI_0.run();
			const fileId = uploaded.id;

			// 2. Ambil email dari Input
			const input = Input1.text.trim();

			// 3. Share ke publik jika kosong
			if (!input) {
				await ShareNonPublic_0.run({
					role: "reader",
					type: "anyone"
				});
			} else {
				// 4. Jika isi → kirim satu per satu
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
			}

			// 5. Jika semua sudah running ok, jalankan tinyUrl_nonPub api post
			await tinyUrl_nonPub.run();

			// Anda bisa menambahkan return nilai atau notifikasi sukses di sini jika diperlukan
			return "Proses upload, share, dan pembuatan TinyURL berhasil!";

		} catch (error) {
			// Menangani error jika ada langkah yang gagal
			console.error("Terjadi error:", error);
			// Anda bisa menampilkan pesan error kepada pengguna di sini
			showAlert("Terjadi kesalahan dalam proses.", "error");
			throw error; // Meneruskan error agar bisa ditangani di tempat lain jika diperlukan
		}
	}
}