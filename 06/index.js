class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      page: 1,
      url: {
        All: "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories",
        JavaScript:
          "https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories",
        Ruby: "https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories",
        Java: "https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories",
        CSS: "https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories",
      },
      tabName: "All",
      isLoading: true,
    };
  }
  componentDidMount = () => {
    console.log(location);
    if (window.location.search) {
      this.setState(
        {
          tabName: this.getUrl("tab"),
        },
        () => {
          const { tabName, url } = this.state;
          this.getData(url[tabName] + "&page=1");
        }
      );
    } else {
      this.getData();
    }
  };
  updateUrl = (key, value) => {
    let newurl = this.updateQueryStringParameter(key, value);
    //向当前url添加参数，没有历史记录
    window.history.replaceState(
      {
        path: newurl,
      },
      "",
      newurl
    );
  };

  updateQueryStringParameter = (key, value) => {
    let uri = window.location.href;
    if (!value) {
      return uri;
    }
    let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    let separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      return uri + separator + key + "=" + value;
    }
  };
  //获取参数
  getUrl = (variable) => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  };
  //获取数据
  getData = (
    url = "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=1"
  ) => {
    this.setState({ isLoading: true }, () => {
      fetch(url)
        .then((res) => {
          if (res.status === 200 || res.status === 304) {
            return res.json();
          } else {
            alert("请求频繁请稍后再试");
          }
        })
        .then((res) => {
          if (res.items) {
            this.setState({
              list: [...this.state.list, ...res.items],
              isLoading: false,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };
  //切换
  onSwitch = (str) => {
    this.updateUrl("tab", str);
    this.setState({ list: [], tabName: str, page: 1 }, () => {
      this.getData(this.state.url[str] + "&page=1");
    });
  };
  //加载更多
  onLodaing = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 }, () => {
      const { tabName, url, page } = this.state;
      this.getData(url[tabName] + `&page=${page}`);
    });
  };
  render() {
    const { list, tabName, isLoading } = this.state;
    return (
      <div>
        <div style={styles.nav}>
          <div
            onClick={() => {
              this.onSwitch("All");
            }}
            style={{ cursor: "pointer", color: tabName === "All" ? "red" : "" }}
          >
            All
          </div>
          <div
            onClick={() => {
              this.onSwitch("JavaScript");
            }}
            style={{
              cursor: "pointer",
              color: tabName === "JavaScript" ? "red" : "",
            }}
          >
            JavaScript
          </div>
          <div
            onClick={() => {
              this.onSwitch("Ruby");
            }}
            style={{
              cursor: "pointer",
              color: tabName === "Ruby" ? "red" : "",
            }}
          >
            Ruby
          </div>
          <div
            onClick={() => {
              this.onSwitch("Java");
            }}
            style={{
              cursor: "pointer",
              color: tabName === "Java" ? "red" : "",
            }}
          >
            Java
          </div>
          <div
            onClick={() => {
              this.onSwitch("CSS");
            }}
            style={{ cursor: "pointer", color: tabName === "CSS" ? "red" : "" }}
          >
            CSS
          </div>
        </div>
        <div style={styles.content}>
          {list.map((item, index) => {
            return (
              <div style={styles.item} key={index}>
                <h2 style={{ textAlign: "center" }}>#{index + 1}</h2>
                <div style={{ textAlign: "center" }}>
                  <img src={item.owner.avatar_url} style={{ width: "150px" }} />
                </div>
                <h3 style={{ textAlign: "center", color: "#b83617" }}>
                  <a href={item.owner.html_url}>{item.owner.login}</a>
                </h3>
                <p style={{ paddingLeft: "20px" }}>
                  <i
                    className="fa fa-user-circle-o"
                    style={{ marginRight: "10px" }}
                  ></i>
                  <a href={item.owner.html_url}>{item.owner.login}</a>
                </p>
                <p style={{ paddingLeft: "20px" }}>
                  <i className="fa fa-star" style={{ marginRight: "10px" }}></i>
                  {item.stargazers_count}
                  <span style={{ marginLeft: "10px" }}>stars</span>
                </p>
                <p style={{ paddingLeft: "20px" }}>
                  <i
                    className="fa fa-code-fork"
                    style={{ marginRight: "10px" }}
                  ></i>
                  {item.forks_count}
                  <span style={{ marginLeft: "10px" }}>forks</span>
                </p>
                <p style={{ paddingLeft: "20px" }}>
                  <i
                    className="fa fa-warning"
                    style={{ marginRight: "10px" }}
                  ></i>
                  {item.open_issues_count}
                  <span style={{ marginLeft: "10px" }}>open issues</span>
                </p>
              </div>
            );
          })}
        </div>
        <div
          className="loading"
          style={{ display: isLoading ? "" : "none", margin: "20px auto" }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={this.onLodaing}
            style={{ width: "80%", textAlign: "center", lineHeight: "35px" }}
          >
            加载更多
          </button>
        </div>
      </div>
    );
  }
}
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-around",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  item: {
    backgroundColor: "#ebebeb",
    width: "24%",
    marginBottom: "10px",
  },
};
ReactDOM.render(<Index />, document.getElementById("app"));
