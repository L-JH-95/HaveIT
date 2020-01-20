// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach(function (el) {
    el.addEventListener('click', function () {
      var id = el.querySelector('td').textContent;
      getComment(id);
    });
  });
  // 사용자 로딩
  function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        var users = JSON.parse(xhr.responseText);
        console.log(users);
        var tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML = '';
        users.map(function (user) {
          var row = document.createElement('tr');
          row.addEventListener('click', function () {
            getComment(user.id);
          });
          var td = document.createElement('td');
          td.textContent = user.id;
          row.appendChild(td);
          td = document.createElement('td');
          td.textContent = user.userID;
          row.appendChild(td);
          td = document.createElement('td');
          td.textContent = user.email;
          row.appendChild(td);
          td = document.createElement('td');
          td.textContent = user.NickName;
          row.appendChild(td);
          tbody.appendChild(row);
        });
      } else {
        console.error(xhr.responseText);
      }
    };
    xhr.open('GET', '/users');
    xhr.send();
  }
  // 댓글 로딩
  function getComment(id) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        var comments = JSON.parse(xhr.responseText);
        var tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';
        comments.map(function (comment) {
          var row = document.createElement('tr');
          var td = document.createElement('td');
          td.textContent = comment.id;
          row.appendChild(td);
          td = document.createElement('td');
          td.textContent = comment.user.userID;
          //td.textContent = comment.commenter;
          row.appendChild(td);
          td = document.createElement('td');
          td.textContent = comment.comment;
          row.appendChild(td);
          var edit = document.createElement('button');
          edit.textContent = '수정';
          edit.addEventListener('click', function () { // 수정 클릭 시
            var newComment = prompt('바꿀 내용을 입력하세요');
            if (!newComment) {
              return alert('내용을 반드시 입력하셔야 합니다');
            }
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
              if (xhr.status === 200) {
                console.log(xhr.responseText);
                getComment(id);
              } else {
                console.error(xhr.responseText);
              }
            };
            xhr.open('PATCH', '/comments/' + comment.id);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({ comment: newComment }));
          });
          var remove = document.createElement('button');
          remove.textContent = '삭제';
          remove.addEventListener('click', function () { // 삭제 클릭 시
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
              if (xhr.status === 200) {
                console.log(xhr.responseText);
                getComment(id);
              } else {
                console.error(xhr.responseText);
              }
            };
            xhr.open('DELETE', '/comments/' + comment.id);
            xhr.send();
          });
          td = document.createElement('td');
          td.appendChild(edit);
          row.appendChild(td);
          td = document.createElement('td');
          td.appendChild(remove);
          row.appendChild(td);
          tbody.appendChild(row);
        });
      } else {
        console.error(xhr.responseText);
      }
    };
    xhr.open('GET', '/comments/' + id);
    xhr.send();
  }
  // 사용자 등록 시
  document.getElementById('user-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var userID=e.target.userID.value;
    var pwd = e.target.pwd.value;
    var email = e.target.email.value;
    var NickName=e.target.NickName.value;
    //let salt = Math.round((new Date().valueOf() * Math.random())) + "";
   // let hashPassword = crypto.createHash("sha512").update(pwd + salt).digest("hex");
    
    if (!userID) {
      return alert('아이디를 입력하세요');
    }
    if (!pwd) {
      return alert('비밀번호를 입력하세요');
    }
    if (!email) {
        return alert('이메일을 입력하세요');
    }
    if (!NickName) {
        return alert('닉네임을 입력하세요');
      }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 201) {
        console.log(xhr.responseText);
        getUser();
      } else {
        console.error(xhr.responseText);
      }
    };
    xhr.open('POST', '/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ userID: userID, pwd: pwd, email: email,NickName:NickName }));
    
    e.target.userID.value='';
    e.target.pwd.value='';
    e.target.email.value='';
    e.target.NickName.value='';

  });
  // 댓글 등록 시
  document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var id = e.target.userid.value;
    var comment = e.target.comment.value;
    if (!id) {
      return alert('아이디를 입력하세요');
    }
    if (!comment) {
      return alert('댓글을 입력하세요');
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 201) {
        console.log(xhr.responseText);
        getComment(id);
      } else {
        console.error(xhr.responseText);
      }
    };
    xhr.open('POST', '/comments');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ id: id, comment: comment }));
    e.target.userid.value = '';
    e.target.comment.value = '';
  });