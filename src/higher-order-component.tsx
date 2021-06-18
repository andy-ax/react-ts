import React, { Children, Component, MouseEventHandler } from 'react';

//高阶组件定义
const HOC = (WrappedComponent: any): any => {
    class WrapperComponent extends Component {
        ref: React.RefObject<any>;
        constructor(props: any) {
            super(props);
            this.ref = React.createRef();
        }
        showMsg() {
            console.log(this.ref);
        }
        render() {
            console.log(this.ref);
            return <WrappedComponent 
                {...this.props}
                ref={this.ref}
            ></WrappedComponent>;
        }
    }
    return WrapperComponent;
}
//普通的组件
class WrappedComponent extends Component{
    render(){
        const props: any = this.props
        return <p>{props.text}</p>
    }
}

//高阶组件使用
// export default HOC(WrappedComponent)
const Hoc = HOC(WrappedComponent);

class HigherOrderComponent extends Component {

    render() {
        return <div>
            <Hoc text={'高阶组件'}></Hoc>
        </div>
    }
}

export default HigherOrderComponent;