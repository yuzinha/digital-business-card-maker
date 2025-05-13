document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const previewContent = document.getElementById('previewContent');

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const nameRomaji = document.getElementById('nameRomaji').value;
        const profileImage = document.getElementById('profileImage').files[0];

        // バリデーション
        if (!name || !nameRomaji) {
            alert('名前とローマ字表記を入力してください。');
            return;
        }

        if (!profileImage) {
            alert('プロフィール画像を選択してください。');
            return;
        }

        if (profileImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                updatePreview(name, nameRomaji, imageUrl);
                addDownloadButton(name, nameRomaji, imageUrl);
            };
            reader.readAsDataURL(profileImage);
        }
    });

    function updatePreview(name, nameRomaji, imageUrl) {
        previewContent.innerHTML = `
            <img src="${imageUrl}" alt="${name}" class="profile-image">
            <h3 class="profile-name">${name}</h3>
            <p class="profile-name-romaji">${nameRomaji}</p>
        `;
    }

    function addDownloadButton(name, nameRomaji, imageUrl) {
        const downloadButton = document.createElement('button');
        downloadButton.textContent = '自己紹介ページをダウンロード';
        downloadButton.className = 'download-button';
        downloadButton.onclick = () => downloadProfilePage(name, nameRomaji, imageUrl);
        previewContent.appendChild(downloadButton);
    }

    function downloadProfilePage(name, nameRomaji, imageUrl) {
        const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}の自己紹介</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            background-color: #f5f5f5;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 2rem;
        }
        .profile-container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        .profile-image {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #3498db;
            margin-bottom: 1rem;
        }
        .profile-name {
            font-size: 1.5rem;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        .profile-name-romaji {
            font-size: 1.2rem;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="profile-container">
        <img src="${imageUrl}" alt="${name}" class="profile-image">
        <h1 class="profile-name">${name}</h1>
        <p class="profile-name-romaji">${nameRomaji}</p>
    </div>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}-profile.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
}); 