'use strict';

import React from 'react';
import ReactNative from 'react-native';

import type  {
  NavigationSceneRendererProps,
  NavigationState,
  NavigationTransitionProps,
} from 'NavigationTypeDefinition';

import DynamicImage from './DynamicImage'

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

const {
  PropTypes: NavigationPropTypes,
  StateUtils: NavigationStateUtils,
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
} = NavigationExperimental;

const {
  PagerPanResponder: NavigationPagerPanResponder,
  PagerStyleInterpolator: NavigationPagerStyleInterpolator,
} = NavigationCard;

function reducer(state: ?NavigationState, action: any): NavigationState {
  if (!state) {
    return {
      index: 0,
      routes: [
        {key: 'Planet 0', image: 0, name: 'Krator XC39'},
        {key: 'Planet 1', image: 1, name: 'Aphrodite TC1'},
        {key: 'Planet 2', image: 2, name: 'Suty V28'},
        {key: 'Planet 3', image: 3, name: 'Melies M55'},
        {key: 'Planet 4', image: 4, name: 'Atlantis U78'},
        {key: 'Planet 5', image: 5, name: 'New Earth H21'}
      ]
    };
  }

  switch (action) {
    case 'back':
      return NavigationStateUtils.back(state);
    case 'forward':
      return NavigationStateUtils.forward(state);
  }
  return state;
}

class ExampleNavigator extends Component {
  _render: Function;
  _renderScene: Function;

  props: {
    navigate: Function,
    navigationState: NavigationState,
  };

  static propTypes: {
    navigationState: NavigationPropTypes.navigationState.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this._render = this._render.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  render(): ReactElement<any> {
    return (
      <NavigationTransitioner
        navigationState={this.props.navigationState}
        render={this._render}
      />
    );
  }

  _render( transitionProps: NavigationTransitionProps): ReactElement<any> {
    const scenes = transitionProps.scenes.map((scene) => {
      const sceneProps = {
        ...transitionProps,
        scene,
      };
      return this._renderScene(sceneProps);
    });
    return (
      <View style={styles.navigator}>
        {scenes}
      </View>
    );
  }

  _renderScene(
    sceneProps: NavigationSceneRendererProps,
  ): ReactElement<any> {
    return (
      <ExampleScene
        {...sceneProps}
        key={sceneProps.scene.key + 'scene'}
        navigate={this.props.navigate}
      />
    );
  }
}

class ExampleScene extends Component {
  props: NavigationSceneRendererProps & {
    navigate: Function,
  };

  static propTypes = {
    ...NavigationPropTypes.SceneRendererProps,
    navigate: PropTypes.func.isRequired,
  };

  render(): ReactElement<any> {
    const {scene, navigate} = this.props;

    const panHandlers = NavigationPagerPanResponder.forHorizontal({
      ...this.props,
      onNavigateBack: () => navigate('back'),
      onNavigateForward: () => navigate('forward'),
    });

    const route: any = scene.route;
    const style = [
      styles.scene,
      NavigationPagerStyleInterpolator.forHorizontal(this.props),
    ];

    return (
      <Animated.View
        {...panHandlers}
        style={style}>
        <View style={styles.heading}>
        <Text style={styles.headingText}>
          {scene.route.name}
        </Text>
          {DynamicImage(scene.route.image)}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  example: {
    flex: 1,
  },
  navigator: {
    flex: 1,
  },
  scene: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  heading: {
    alignItems : 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headingText: {
    color: '#222',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
});

class App extends Component {
  state: NavigationState;
  constructor(props: any, context: any) {
    super(props, context);
    this.state = reducer();
  }

  render(): ReactElement<any> {
    return (
      <View style={styles.example}>
        <ExampleNavigator
          navigationState={this.state}
          navigate={action => this._navigate(action)}
        />
      </View>
    );
  }

  _navigate(action: string): boolean {
    const state = reducer(this.state, action);
    if (state === this.state) {
      return false;
    }

    this.setState(state);
    return true;
  }

  // This public method is optional. If exists, the UI explorer will call it
  // the "back button" is pressed. Normally this is the cases for Android only.
  handleBackAction(): boolean {
    return this._navigate('back');
  }
}

export default App
