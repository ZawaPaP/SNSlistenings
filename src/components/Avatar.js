import React, { Component } from 'react'
import defaultAvatar from '../images/defaultAvatar.jpg'

class Avatar extends Component {

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    render () {
        var base64Flag = 'data:image/png;base64,';
        if (this.props.user.userAvatar) {
            var imageStr = this.arrayBufferToBase64(this.props.user.userAvatar.data);
            var avatar = base64Flag + imageStr
        } else {
            var avatar = defaultAvatar
        }
        console.log(this.props)
    return(
        <img className="Avatar"
        src={avatar}
        alt={this.props.user.username}
        />
    )
}
}


export default Avatar;
