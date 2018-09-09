import service from '../../service';

const competitionList = () => {
  let activePart = 'allCompetition';

  const handle = (data) => {
    if (data.length) {
      data.forEach((obj) => {
        let submitGroup;

        if (+window.localStorage.access === -1) {
          submitGroup = `
            <button
              name="apply"
              aria-labelledby="${obj.id}"
              style="width: 100px"
              class="btn btn-primary"
              >报名</button>`;
        } else {
          submitGroup = `
            <button
              name="detail"
              aria-labelledby="${obj.id}"
              class="btn btn-primary"
              >查看参赛者</button>
            <button
              name="modify"
              aria-labelledby="${obj.id}"
              style="width: 100px"
              class="btn btn-success"
              >修改</button>
            <button
              name="delete"
              aria-labelledby="${obj.id}"
              style="width: 100px"
              class="btn btn-danger"
              >删除</button>`;
        }

        const list = `
          <tr style="cursor: pointer" data-toggle="collapse" data-target="#${obj.id}" aria-expanded="false" aria-controls="${obj.id}">
            <th scope="row">${obj.id}</th>
            <td>${obj.name}</td>
            <td>${obj.start_time}</td>
            <td>${obj.end_time}</td>
          </tr>`;

        const detail = `
          <tr>
            <td colspan="4" style="border-top: 0">
              <div class="collapse" id="${obj.id}" >
                <div class="card card-body">
                  <div style="margin-bottom: 6px">
                    <span style="display: inline-block; width: 100px">比赛地区</span>
                    <span>${obj.competition_area || '无'}</span>
                  </div>
                  <div style="margin-bottom: 6px">
                    <span style="display: inline-block; width: 100px">学校名称</span>
                    <span>${obj.school_name || '无'}</span>
                  </div>
                  <div style="margin-bottom: 6px">
                    <span style="display: inline-block; width: 100px">负责人姓名</span>
                    <span>${obj.principal_name || '无'}</span>
                  </div>
                  <div style="margin-bottom: 6px">
                    <span style="display: inline-block; width: 100px">负责人邮箱</span>
                    <span>${obj.principal_email || '无'}</span>
                  </div>
                  <div style="margin-bottom: 6px">
                    <span style="display: inline-block; width: 100px">负责人电话</span>
                    <span>${obj.principal_phone || '无'}</span>
                  </div>
                  <div style="margin-bottom: 6px">
                    <span style="display: inline-block; width: 100px">比赛介绍</span>
                    <p>${obj.introduction || '无'}</p>
                  </div>
                  <div>
                    ${submitGroup}
                  </div>
                </div>
              </div>
            </td>
          </tr>`;

        window.$('#competition').append(list);
        window.$('#competition').append(detail);
      });
    } else {
      const empty = `
        <tr>
          <td colspan="4" style="text-align: center">empty</td>
        </tr>`;

      window.$('#competition').append(empty);
    }

    window.$('button').click((event) => {
      switch (event.target.name) {
        case 'detail':
          window.location.hash = `/competition/members?id=${window.$(event.target).attr('aria-labelledby')}`;
          break;
        case 'create':
          window.location.hash = '/competition/create';
          break;
        case 'modify':
          window.location.hash = `/competition/edit?id=${window.$(event.target).attr('aria-labelledby')}`;
          break;
        case 'delete':
          service.delete(`/race/${window.$(event.target).attr('aria-labelledby')}`).then(() => {
            window.location.reload();
          });
          break;
        case 'apply':
          window.location.hash = `/competition/apply?id=${window.$(event.target).attr('aria-labelledby')}`;
          break;
        default:
          break;
      }
    });
  };

  const getData = () => {
    window.$('#competition').empty();
    if (activePart === 'allCompetition') {
      service.get('/race').then((res) => {
        handle(res.data);
      });
    } else {
      service.get('user/races').then((res) => {
        handle(res.data);
      });
    }
  };

  let createPart = '';

  if (+window.localStorage.access > -1) {
    createPart = '<button id="createCompetition" name="create" class="btn btn-primary">创建比赛</button>';
  }

  const studentPart = `
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a id="allCompetition" class="nav-link active" style="cursor: pointer">所有比赛</a>
      </li>
      <li class="nav-item">
        <a id="myCompetition" class="nav-link" style="cursor: pointer">我报名的比赛</a>
      </li>
    </ul>`;

  const element = `
    ${createPart}
    <div style="margin-top: 20px">点击比赛可获取更多信息</div>
    <div style="margin-top: 30px">
      ${+window.localStorage.access === -1 ? studentPart : ''}
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">比赛名称</th>
            <th scope="col">报名开始时间</th>
            <th scope="col">报名结束时间</th>
          </tr>
        </thead>
        <tbody id="competition"></tbody>
      </table>
    </div>`;

  window.$('#main').append(element);

  if (+window.localStorage.access === -1) {
    window.$('#allCompetition').click(() => {
      window.$('#allCompetition').addClass('active');
      window.$('#myCompetition').removeClass('active');
      activePart = 'allCompetition';
      getData();
    });
    window.$('#myCompetition').click(() => {
      window.$('#allCompetition').removeClass('active');
      window.$('#myCompetition').addClass('active');
      activePart = 'myCompetition';
      getData();
    });
  }
  window.$(() => {
    getData();
  });
};

export default competitionList;
