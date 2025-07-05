export default {
	async uploadAllFiles () {
		for (let file of FilePicker1.files) {
			const base64 = file.data.split(",")[1]; // hapus prefix "data:image/png;base64,..."

			const body = `--boundary123
Content-Type: application/json; charset=UTF-8

{
  "name": "${file.name}",
  "parents": ["1vzCZ3XpjPdPgACYNy97TQbmN21m5AFvr"]
}

--boundary123
Content-Type: ${file.type}
Content-Transfer-Encoding: base64

${base64}
--boundary123--`;

			try {
				await UploadAPI.run({ body }); // kirim body ke API
				await new Promise(r => setTimeout(r, 300)); // delay 300ms agar stabil
			} catch (err) {
				showAlert(`❌ Gagal upload: ${file.name}`, "error");
				console.error(err);
			}
		}

		showAlert("✅ Semua file berhasil di-upload!", "success");
	}
}
