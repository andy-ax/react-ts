import React, { BaseSyntheticEvent, Children, Component, MouseEventHandler } from 'react';
// 属性代理
// 高阶组件定义
const HOC = (WrappedComponent: any): any => 
    class extends Component {
        ref: React.RefObject<any>;
        constructor(props: any) {
            super(props);
            this.ref = React.createRef();
            this.state = {
                value: '',
            }
        }
        showMsg() {
            console.log(this.ref);
        }

        // 抽象state 分离内部状态
        onNameChange(event: BaseSyntheticEvent) { 
            this.setState({ 
                name: event.target.value, 
            }) 
        }
        render() {
            console.log(this.ref);
            const state: any = this.state;
            const value = {
                value: state.name,
                onChange: this.onNameChange.bind(this)
            }
            return <WrappedComponent 
                {...this.props}
                ref={this.ref}
                {...value}
            ></WrappedComponent>;
        }
    }
// 普通的组件
class WrappedComponent extends Component{
    render(){
        const props: any = this.props
        return <input {...props} />
    }
}

// 高阶组件使用
// export default HOC(WrappedComponent)
const Hoc = HOC(WrappedComponent);

// 反向继承
const container = (WrappedComponent: any): any => 
    class extends WrappedComponent {
        render() {
            return super.render();
        }
    }

// 可多次使用反向代理
const ContainerHoc = container(container(container(WrappedComponent)));

class HigherOrderComponent extends Component {

    render() {
        return <div>
            <Hoc placeholder={'高阶组件'}></Hoc>
            <ContainerHoc></ContainerHoc>
        </div>
    }
}

export default HigherOrderComponent;