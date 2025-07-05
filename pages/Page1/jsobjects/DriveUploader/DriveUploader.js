export default {
	async uploadAllFiles () {
		for (let file of FilePicker1.files) {
			const base64 = file.data.split(",")[1]; // bersihkan prefix

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
				// ⚠️ WAJIB pakai await agar upload satu per satu
				await uploadToDrive.run({ body });
				console.log(`Berhasil upload: ${file.name}`);
			} catch (err) {
				showAlert(`Gagal upload: ${file.name}`, "error");
				console.error(err);
			}
		}

		showAlert("Semua file selesai di-upload!", "success");
	}
}