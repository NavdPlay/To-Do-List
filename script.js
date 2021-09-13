function addList() {
    var text = document.getElementById('name-input').value;
    if (text == '' || text == undefined) {
        document.getElementById('popup-container').style.display = 'block'; 
        return text;
    }
    var node = document.createElement('LI');
    node.classList.add('list-child');
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById('list').appendChild(node);
}

$('#name-input').keyup(
    function() {
        document.getElementById('popup-container').style.display = 'none'; 
    }
);

$(document).on('click', '.list-child', function() {
    if ($(this).hasClass('checked')) {
        $(this).removeClass('checked');
    } else {
        $(this).addClass('checked');
    }
});

$(document).on('click', '#add-btn', function() {
    $('.fas').remove();
    $('.list-child').append('<i class="fas fa-times"></i>')
});

$(document).on('click', '.fas', function() {
    $(this).parent().remove();
    $(this).remove();
});
