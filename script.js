document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const imageInput = document.getElementById('image');
    const addFieldBtn = document.getElementById('add-field');
    const fieldContainer = document.getElementById('field-container');
    const previewName = document.getElementById('preview-name');
    const previewImage = document.getElementById('preview-image');
    const previewFields = document.getElementById('preview-fields');

    // 名前と画像の入力イベント
    nameInput.addEventListener('input', updatePreview);
    imageInput.addEventListener('input', updatePreview);

    // フィールド追加ボタンのイベント
    addFieldBtn.addEventListener('click', addNewField);

    // プレビューの更新
    function updatePreview() {
        previewName.textContent = nameInput.value || '名前';
        previewImage.src = imageInput.value || '';
    }

    // 新しいフィールドを追加
    function addNewField() {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'form-group field-group';
        fieldDiv.innerHTML = `
            <div class="field-inputs">
                <input type="text" class="field-label-input" placeholder="ラベル">
                <input type="text" class="field-value-input" placeholder="値">
            </div>
            <button class="remove-field">削除</button>
        `;

        fieldContainer.appendChild(fieldDiv);

        // フィールドの入力イベント
        const labelInput = fieldDiv.querySelector('.field-label-input');
        const valueInput = fieldDiv.querySelector('.field-value-input');
        const removeBtn = fieldDiv.querySelector('.remove-field');

        labelInput.addEventListener('input', updatePreviewFields);
        valueInput.addEventListener('input', updatePreviewFields);
        removeBtn.addEventListener('click', () => {
            fieldDiv.remove();
            updatePreviewFields();
        });
    }

    // プレビューフィールドの更新
    function updatePreviewFields() {
        previewFields.innerHTML = '';
        const fieldGroups = document.querySelectorAll('.field-group');
        
        fieldGroups.forEach(group => {
            const label = group.querySelector('.field-label-input').value;
            const value = group.querySelector('.field-value-input').value;
            
            if (label && value) {
                const fieldItem = document.createElement('div');
                fieldItem.className = 'field-item';
                fieldItem.innerHTML = `
                    <div class="field-label">${label}</div>
                    <div class="field-value">${value}</div>
                `;
                previewFields.appendChild(fieldItem);
            }
        });
    }
}); 