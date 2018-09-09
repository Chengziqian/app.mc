import service from '../../service';

const membersMembers = (router) => {
  const getData = () => {
    service.get(`race/${router.query.get('id')}/members`).then((res) => {
      res.data.forEach((obj) => {
        const list = `
          <tr>
            <th scope="row">${obj.id}</th>
            <td>${obj.truename}</td>
            <td>${obj.gender === 0 ? '男' : '女'}</td>
            <td>${obj.college}</td>
            <td>${obj.school_number}</td>
          </tr>`;

        window.$('#members').append(list);
      });
    });
  };

  const element = `
    <a id="download" href="/api/race/${router.query.get('id')}/download" class="btn btn-primary">下载参赛者信息</a>
    <table class="table" style="margin-top: 30px">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">姓名</th>
          <th scope="col">性别</th>
          <th scope="col">学院</th>
          <th scope="col">学号</th>
        </tr>
      </thead>
      <tbody id="members"></tbody>
    </table>`;

  window.$('#main').append(element);

  window.$(() => {
    getData();
  });
};

export default membersMembers;