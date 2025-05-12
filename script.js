$(document).ready(function() {
    $('#addBtn').click(function() {
      let task = $('#task').val().trim();
      if (task !== '') {
        $('#taskList').append(`
          <li>
            <span class="task-text">${task}</span>
            <div class="action-btn">
              <span class="edit">✎</span>
              <span class="delete">✖</span>
            </div>
          </li>`);
        $('#task').val('');
      }
    });

    // Add task with Enter key
    $('#task').keypress(function(e) {
      if (e.which === 13) {
        $('#addBtn').click();
      }
    });

    // Delete task
    $('#taskList').on('click', '.delete', function() {
      $(this).closest('li').remove();
    });

    // Edit task
    $('#taskList').on('click', '.edit', function() {
      const li = $(this).closest('li');
      const taskText = li.find('.task-text');
      const currentText = taskText.text();
      const input = $(`<input type="text" class="edit-input" value="${currentText}">`);
      
      taskText.replaceWith(input);
      input.focus();

      // Save changes on Enter or blur
      input.on('keypress blur', function(e) {
        if (e.which === 13 || e.type === 'blur') {
          const newText = input.val().trim() || currentText;
          input.replaceWith(`<span class="task-text">${newText}</span>`);
        }
      });
    });
  });