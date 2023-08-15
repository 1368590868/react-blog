/**
 * loading 占位
 * 解决首次加载时白屏的问题
 */
(function () {
  const _root = document.querySelector('#root');

  if (_root && _root.innerHTML === '' && sessionStorage.getItem('firstLoad') !== 'true') {
    sessionStorage.setItem('firstLoad', true);
    _root.innerHTML = `
      <style>
        html,
        body,
        #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        #root {
          background-repeat: no-repeat;
          background-size: 100% auto;
        }

        .loading-title {
          font-size: 1.1rem;
        }

        .loading-sub-title {
          margin-top: 20px;
          font-size: 1rem;
          color: #888;
        }

        .page-loading-warp {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 26px;
        }
       
      </style>

      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 362px;
      ">
        <div class="page-loading-warp">
          <img src="/loading.gif" alt="loading"/>
        </div>
        <div class="loading-title">
          努力加载中...
        </div>
        <div class="loading-sub-title">
          初次加载可能需要较多时间 请耐心等待
        </div>
      </div>
    `;
  }
})();
