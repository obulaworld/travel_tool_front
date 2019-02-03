import React, {Component} from 'react';
import {shuffle} from 'lodash';
import Images from '../../images/loaders';
import travela from '../../images/travela.svg';
import './PageBody.scss';
import './loaderAnimation.scss';
import quotes from '../../helper/loaderQuotes';

class LoaderBody extends Component{

  state = { 
    imageIndex: 0,
    images: shuffle(Object.values(Images))
  };
  
  componentDidMount () {
    this.changeImage();  
  }
  
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    } 
  }

  changeImage = ()=> {
    const { images } = this.state;
    this.setState(({ imageIndex })=> {
      const nextImageIndex = ++imageIndex % images.length;
      return { imageIndex: nextImageIndex };
    }, ()=> {
      this.timeout = setTimeout(
        this.changeImage,
        120000
      );
    });
  }
  
  render(){
    const quote = quotes[Math.floor(Math.random()*quotes.length)];
    const { imageIndex, images } = this.state;
    const Image = images[imageIndex];
    
    return(
      <div className="loader-page">
        <div className="pageOverlay">
          <div className="loader__title-text">
            <div>
              <img 
                src={travela} 
                alt="Travela Logo" 
                className="loader__center-logo" 
              />
            </div>
          </div>
          <div className="loaderBody">
            <div className="logo-loader">
              <Image />
            </div>
            <p className="loader__body-text">
              {quote}
            </p>
          </div>
        </div>
      </div>

    );
  }
}

export default LoaderBody;

