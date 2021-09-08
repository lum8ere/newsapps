import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import './modal.css'


class CreateComments extends Component {
    state = {
        postId: "",
        id: "",
        name: "",
        email: "",
        body: ""
    }

    componentDidMount() {
        this.getComment()
    }

    getComment = () => {
        axios
            .get('http://localhost:8000/comments/')
            .then(res => {
                const data = res.data
                this.setState({ comment: data })
            })
            .catch(err => console.log(err));
    }

    resetCommentsInputs = () => {
        this.setState({
            postId: "",
            id: "",
            name: "",
            email: "",
            body: ""
        })
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({
            [name]: value
        })
    }

    submit = (e) => {
        e.preventDefault();

        const payload = {
            postId: this.state.postId,
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            body: this.state.body,
        }

        axios({
            url: "http://localhost:8000/comments/create",
            method: "POST",
            data: payload
        })
            .then(() => {
                alert('Комментарий добавлен')
                this.resetCommentsInputs();
                this.getComment()
            })

            .catch(err => console.log(err));
    }

    Dsubmit = (e => {
        e.preventDefault()

        const Dpayload = {
            id: this.state.id
        }

        axios({
            url: `http://localhost:8000/comments/delete?id=${this.state.id}`,
            method: "DELETE",
            data: Dpayload
        })
            .then(() => {
                const retardalert = () => {
                    swal({
                        title: "Действительно хотите удалить?",
                        icon: "warning",
                        buttons: ["Нет", "Да"]
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                swal("Удалено!", {
                                    icon: "success",
                                })
                            } 
                        })
                }
                retardalert()
                this.resetCommentsInputs()
                this.getComment()
            })

            .catch(err => console.log(err));
    })


    

    render() {
        return (
            <div className="APP">

                <a href="#addComment" class="btn">Создать</a>
                <a href="#deleteComment" class="btn">Удалить</a>
               
                <div id="addComment" class="modalbackground">
                    <div class="modalwindow">
                        <form onSubmit={this.submit}>
                            <div className="form-input-create">
                                <input
                                    type="text"
                                    name="postId"
                                    placeholder="postId"
                                    value={this.state.postId}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-input-create">
                                <input
                                    type="text"
                                    name="id"
                                    placeholder="id"
                                    value={this.state.id}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-input-create">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-input-create">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-input-create">
                                <textarea
                                    cols="15"
                                    rows="5"
                                    name="body"
                                    placeholder="body"
                                    value={this.state.body}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button>Создать</button>
                        </form>
                        <a href="#" class="btn">Закрыть</a>
                    </div>
                </div>
                <div id="DeleteComment">
                    <div>
                        <div id="deleteComment" class="modalbackground">
                            <div class="modalwindow">
                                <form onSubmit={this.Dsubmit} onClick={this.retardalert}>
                                    <div className="form-input-delete">
                                        <input
                                            type="text"
                                            name="id"
                                            placeholder="id"
                                            value={this.state.id}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <button onClick={this.retardalert}>Удалить</button>
                                </form>
                                <a href="#" class="btn">Закрыть</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateComments


