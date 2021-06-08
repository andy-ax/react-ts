import React, { Children, Component, MouseEventHandler } from 'react';
import logo from './logo.svg';
import './App.css';

type h3arg = {
  children: string;
  title: string;
}
// react 无状态函数
const H3 = ({children, title}: h3arg) => {
    return <h3 title={title}>{children}</h3>
}

type copyrightArg = {
    beforeCRText: string;
    afterCRText: string;
}
// 使用数组对数据进行组装
const CopyrightP = ({beforeCRText, afterCRText}: copyrightArg) => {
    return <p>{[beforeCRText, '©', afterCRText]}</p>
}

type buttonArg = Readonly<{
    color?: string;
    background?: string;
    text?: string;
}>
// 使用class设置组件
class OKButton extends Component<buttonArg> {

    constructor(props: buttonArg) {
        super(props);
        console.log(this.props)
    }

    static defaultProps: buttonArg = {
        color: '#fff',
        background: '#33f',
        text: 'OK',
    }

    render() {
        const {color, text, background} = this.props;

        const style = {
            color,
            fontSize: '12px',
        }

        return <button 
            className={`btn btn-${text}`} 
            // style的声明方式1：使用双大括号 其实也是使用object
            style={{background: background as string, border: 'none'}}
            // 事件的绑定 如果不使用bind，handle函数将无法正确访问class中的内容 
            // handle也可以使用箭头函数来规避此问题
            onClick={this.handleClick.bind(this)}
        >
            {/* style的声明方式2：使用object */}
            <em style={style as any}>{text}</em>
        </button>
    }

    // 事件e的声明，必须用React自己的event类型
    handleClick(e: React.MouseEvent) {
        console.log(this.props.text);
    }
} 

function App() {
  return (
    <div className="App">
      <header className="App-header">
          {/* react组件的引用方式 */}
        <H3 title="name">hello world!</H3>
        <CopyrightP beforeCRText="cc" afterCRText="2015"></CopyrightP>
        <OKButton color="#eee"></OKButton>
      </header>
    </div>
  );
}


export default App;
