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

type tabsArg = Readonly<{
    children: any;
    activeIndex: number
}>
class Tabs extends Component<tabsArg> {
    constructor(props: tabsArg) {
        super(props);
    }

    render() {
        const {children, activeIndex} = this.props;

        return <div className="tabs" >{this.getTabPanes()}</div>
    }

    // 父组件组装子组件并给子组件添加属性
    getTabPanes() {
        const {children, activeIndex} = this.props;

        return React.Children.map(children, (child) => {
            if (!child) {
                return;
            }

            const childIndex = child.props.index;
            const isActive = activeIndex === childIndex;
            return React.cloneElement(child, 
                // 给子组件添加的属性
                {
                    isActive,
                }
            )
        })
    }
}
type tabPaneArg = {
    children: string;
    index: number; // 给父组件调用的参数，子组件自己不使用
    isActive?: boolean; // 父组件传递给子组件的参数，子组件初始化时不传入
};
class TabPane extends Component<tabPaneArg> {

    render() {
        const {children, isActive} = this.props;
        return <div 
            className={`tabpane ${isActive ? 'active-tabpen' : 'unactive-tabpen'}`}
        >{children}</div>
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
        <Tabs activeIndex={1}>
            <TabPane index={1}>tab1</TabPane>
            <TabPane index={2}>tab2</TabPane>
            <TabPane index={3}>tab3</TabPane>
        </Tabs>
      </header>
    </div>
  );
}


export default App;
