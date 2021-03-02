import React, { Component } from 'react';
import SearchBar from './SearchBar'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'
import youtube from '../apis/youtube'

export class App extends Component {
    state = { videos: [] , selectedVideo: null }

    onTermSubmit = async (term) => {
        console.log(term)
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        })
        this.setState({ 
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }

    onVideoSelect = (video) => {
        console.log('From the app!: ', video)
        this.setState({ selectedVideo: video })
    }

    componentDidMount = () => {
        // default on the first loading
        this.onTermSubmit('buildings')
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail 
                            video={this.state.selectedVideo}
                        />
                    </div>
                    <div className="five wide column">
                        <VideoList 
                            onVideoSelect={this.onVideoSelect} 
                            videos={this.state.videos} 
                        />
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default App
