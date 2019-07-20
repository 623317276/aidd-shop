import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
  pageLimit = 20;
  public directionCount = 0;
  page = 0;
  state = {
    refreshState: {
      currentState: 'deactivate',
      drag: false,
    },
    direction: 'up',
    endReachedRefresh: false,
    height: '100%',
    data: [],
  };
  dtPullToRefreshStyle = { height: this.state.height + 'px' };

  constructor() {}


  pullToRefresh(event) {
    if (event === 'endReachedRefresh') {
        if (this.page < 9) {
          this.page++;
          this.addItems(this.page * this.pageLimit);
          this.state.refreshState.currentState = 'release';
          setTimeout(() => {
            this.state.refreshState.currentState = 'finish';
          }, 1000);
        }
    } else {
       if (event === 'down') {
        this.state.data = [];
        this.page = 0;
        this.addItems(0);
      } else {
        if (this.page < 9) {
          this.page++;
          this.addItems(this.page * this.pageLimit);
        }
      }
    }
  }

  addItems(startIndex) {
    for (let i = startIndex; i < this.pageLimit * (this.page + 1); i++) {
      this.state.data.push(i);
    }
  }

  genData() {
    const dataArr = [];
    for (let i = 0; i < 100; i++) {
      dataArr.push(i);
    }
    return dataArr;
  }

  ngOnInit() {
    this.addItems(0);
  }

}
