'use strict';

const Image00 = require('./images/00.png')
const Image01 = require('./images/01.png')
const Image02 = require('./images/02.png')
const Image03 = require('./images/03.png')
const Image04 = require('./images/04.png')
const Image05 = require('./images/05.png')
const Image06 = require('./images/06.png')

const React = require('react');
const ReactNative = require('react-native');

const {
  Component,
  PropTypes,
} = React;

const {
  Animated,
  NavigationExperimental,
  StyleSheet,
  Text,
  Image,
  View,
} = ReactNative;


/**
https://github.com/facebook/react-native/issues/521
RN supports using require to load images
<Image source={require('myimage.png')} />

or a source object with a uri attribute
<Image source={{uri: 'myimage.png'}} />

This works great with remote images and dynamic image names, but there's
no validation.
Legacy image! paths support dynamic names, but to keep this
example simple I decided to manually requiring the local images.
*/

export default function DynamicImage(imageIndex) {
  let result = null

  switch(imageIndex) {
    case 0:
    result = <Image
      source={Image00} />
    break;
    case 1:
    result = <Image
      source={Image01} />
    break;
    case 2:
    result = <Image
      source={Image02} />
    break;
    case 3:
    result = <Image
      source={Image03} />
    break;
    case 4:
    result = <Image
      source={Image04} />
    break;
    case 5:
    result = <Image
      source={Image05} />
    break;
    case 6:
    result = <Image
      source={Image06} />
    break;

  }
  return result

}
