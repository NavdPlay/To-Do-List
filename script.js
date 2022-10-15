function toggleWidth(x) {
  if (x.id == 'line-0') {
    x.style.width = 'calc(45% + 1px)';
    x.setAttribute('id', 'line-1');
  } else {
    x.style.width = '0';
    x.setAttribute('id', 'line-0');
  }
}

function loadTasks() {
  $('.listBox').html('');
  $('.notice').css({
    'display': 'none',
  });

  if (!localStorage.hasOwnProperty('tasks') || localStorage.tasks == '') {
    $('.notice').css({
      'display': 'block',
    });
    return false;
  }
  var textTasks = localStorage.tasks;
  textTasks = textTasks.split('|').map(i => i.split('.'));
  for (var i = 0; i < textTasks.length; i++) {
    $('.listBox').append(`<li id="${textTasks[i][1]}" onclick="removeTask(this)">${textTasks[i][0]}<hr class="taskLine"></li>`);
  }
}

$('.prompt').keyup(function() {
  if (event.which == 13) {
    var random = '';
    for (var i = 0; i < 6; i++) {
      var num = Math.floor(Math.random() * 16);
      random += num;
    }
    if (localStorage.tasks == undefined || localStorage.tasks == '') {
      localStorage.tasks = `${$('.prompt').val()}.${parseInt(random).toString(16)}`;
    } else {
      localStorage.tasks += `|${$('.prompt').val()}.${parseInt(random).toString(16)}`;
    }
    $('.listBox').html('');
    loadTasks();
    $('.prompt').val('');
  }
});

function removeTask(x) {
  var confirmation = confirm(`Delete task: "${x.innerHTML.split('<')[0]}"?`);
  if (!confirmation) {
    return true;
  }
  var textTasks = localStorage.tasks;
  textTasks = textTasks.split('|').map(i => i.split('.'));
  for (var i = 0; i < textTasks.length; i++) {
    if (textTasks[i][1] == x.id) {
      textTasks.splice(i, 1);
    }
  }
  for (var i = 0; i < textTasks.length; i++) {
    textTasks[i] = textTasks[i].join('.');
  }
  textTasks = textTasks.join('|');

  localStorage.tasks = '';
  localStorage.tasks += textTasks;
  loadTasks();
}

loadTasks();
