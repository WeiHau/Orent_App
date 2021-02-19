import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Button,
  Linking,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Dimensions,
  PanResponder,
} from "react-native";
import ScreenLoadingModal from "../util/ScreenLoadingModal";

const Content = (props) => (
  <ScrollView
    onScroll={props.onScroll}
    onScrollBeginDrag={props.onScrollBeginDrag}
    onScrollEndDrag={props.onScrollEndDrag}
    onTouchStart={props.onTouchStart}
    onTouchEnd={props.onTouchEnd}
  >
    <View style={{ flex: 1 }}>
      <View style={{ width: "100%", height: 200, backgroundColor: "red" }} />
      <View style={{ width: "100%", height: 200, backgroundColor: "green" }} />
      <View style={{ width: "100%", height: 200, backgroundColor: "blue" }} />
      <View style={{ width: "100%", height: 200, backgroundColor: "pink" }} />
      <View style={{ width: "100%", height: 200, backgroundColor: "purple" }} />
      <View style={{ width: "100%", height: 200, backgroundColor: "orange" }} />
      <View style={{ width: "100%", height: 200, backgroundColor: "yellow" }} />
    </View>
  </ScrollView>
);

const windowHeight = Dimensions.get("window").height;

//makerbubble.com/swipe-down-to-dismiss-react-native/
//https: //reactnative.dev/docs/panresponder

const TestPage = (props) => {
  let translateValue = useRef(new Animated.Value(200)).current;
  let opened = useRef(false).current;

  let panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const initialPosition = opened ? 500 : 200;
        translateValue.setValue(initialPosition + gestureState.dy); //step 1
      },
      onPanResponderRelease: (e, gesture) => {
        const shouldOpen = gesture.vy >= 0;
        opened = shouldOpen;
        Animated.spring(translateValue, {
          toValue: shouldOpen ? 500 : 200,
          velocity: gesture.vy, // more than 0 mean swipes down
          tension: 2,
          friction: 8,
          useNativeDriver: true,
        }).start(); //step 2
      },
    })
  ).current;

  const scrollY = new Animated.Value(0);
  //scrollY.addListener(({ value }) => (this._value = value));
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
  });

  //let touchingContent = useRef(false).current;
  let headerCurrentPosition = useRef(200).current;
  const [touchingContent, setTouchingContent] = useState(false);

  return (
    <View>
      {/* <ScrollView>
        <View style={{ width: "100%", height: 500, backgroundColor: "red" }} />
        <View style={{ width: "100%", height: 500, backgroundColor: "blue" }} />
      </ScrollView> */}
      <Content
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        onScrollBeginDrag={() => {
          //touchingContent = true;
          setTouchingContent(true);
          console.log(touchingContent);
          //console.log(scrollY._value);
        }}
        onScrollEndDrag={() => {
          //touchingContent = false;
          setTouchingContent(false);
          console.log(touchingContent);
          //console.log(scrollY._value);
        }}
        onTouchStart={() => {}}
        onTouchEnd={() => {}}
      />
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            position: "absolute",
            elevation: 1,
            top: -windowHeight,
            left: 0,
            right: 0,
            padding: 15,
            height: windowHeight - 100,
            width: "100%",
            backgroundColor: "#ccc",
          },
          {
            transform: [{ translateY: translateY }],
          },
        ]}
      >
        <Text>Hello There</Text>
      </Animated.View>
    </View>
  );
};

// Tutorial

// what i want to achieve:
// a button in the moving header, click then extend down

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedTouchable2 = Animated.createAnimatedComponent(
  TouchableWithoutFeedback
);
export default TestPage2 = (props) => {
  const Header = (props) => {
    return (
      <View
        style={{
          height: x,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <Text>This is a header</Text>
      </View>
    );
  };

  const Header2 = (props) => {
    return (
      <View
        style={{
          height: x + 400,
          //position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: 80,
          backgroundColor: "cyan",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <TextInput placeholder="Test Input" />
        <Button title="he2" onPress={() => console.log("dfsfo")} />
        <Text style={{ backgroundColor: "red" }}>This is another header</Text>
      </View>
    );
  };

  const x = 80;
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, x);
  const translateY = diffClamp.interpolate({
    inputRange: [0, x],
    outputRange: [0, -x],
  });

  const [expanded, setExpanded] = useState(false);
  const scrollY2 = new Animated.Value(-400);

  return (
    <View style={{ backgroundColor: "black" }}>
      <AnimatedTouchable
        style={{
          width: "100%",
          elevation: 4,
          justifyContent: "flex-end",
          zIndex: 10,
          position: "absolute",
          backgroundColor: "rgba(0,0,0,1)",
          transform: [{ translateY: translateY }],
        }}
        onPress={() => {
          if (expanded) {
            Animated.timing(scrollY2, {
              toValue: -400,
              tension: 2,
              friction: 8,
              useNativeDriver: true,
            }).start(() => setExpanded(false));
          } else {
            setExpanded(true);
          }
        }}
      >
        <View
          style={{
            //position: "absolute",
            justifyContent: "flex-end",
            top: 0,
            left: 0,
            right: 0,
            height: x,
            backgroundColor: "orange",
          }}
        >
          <Text>TOUCH THIS</Text>
        </View>
      </AnimatedTouchable>
      <ScrollView
        scrollEnabled={!expanded}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      >
        <Content />
      </ScrollView>
      {expanded && (
        <Animated.View
          onLayout={() => {
            Animated.spring(scrollY2, {
              toValue: 0,
              tension: 2,
              friction: 8,
              useNativeDriver: true,
            }).start();
          }}
          style={{
            elevation: 2,
            width: "100%",
            transform: [{ translateY: scrollY2 }],
            position: "absolute",
          }}
        >
          <Header2 />
        </Animated.View>
      )}
    </View>
  );
};

// Tutorial
// import React, { Fragment, Component } from "react";
// import {
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Text,
//   Animated,
//   PanResponder,
// } from "react-native";

// class App extends Component {
//   state = {
//     translateValue: new Animated.Value(200), // initial value of 'transform: translateY'.
//     //As our subView has a height of 200 px to hide it we need to take it down to 200 px.
//     //To do this we will use 'transform: translateY(200)'
//   };

//   constructor(props) {
//     super(props);
//     this.panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (event, gestureState) => {
//         console.log("sdf");
//         console.log("asdflakj");
//         this.state.translateValue.setValue(Math.max(0, 0 + gestureState.dy)); //step 1
//       },
//       onPanResponderRelease: (e, gesture) => {
//         const shouldOpen = gesture.vy <= 0;
//         Animated.spring(this.state.translateValue, {
//           toValue: shouldOpen ? 0 : 200,
//           velocity: gesture.vy,
//           tension: 2,
//           friction: 8,
//           useNativeDriver: true,
//         }).start(); //step 2
//       },
//     });
//   }

//   toggleDetails = (shouldOpen) => {
//     let toValue = 0; // if we need to open our subView, we need to animate it to it original hight.
//     //To do this, we will use 'transform: translateY(0)'
//     if (!shouldOpen) {
//       toValue = 200;
//     } // if it's already open and we need to hide it, we will use 'transform: translateY(200)'
//     Animated.spring(this.state.translateValue, {
//       toValue: toValue,
//       velocity: 3,
//       tension: 2,
//       friction: 8,
//       useNativeDriver: true,
//     }).start(); // the actual animation
//   };

//   render() {
//     return (
//       <Fragment>
//         <View style={styles.mainView}>
//           <TouchableOpacity
//             onPress={() => {
//               this.toggleDetails(true);
//             }}
//             style={styles.openButton}
//           >
//             <Text style={styles.openButtonText}>Open details</Text>
//           </TouchableOpacity>
//         </View>
//         <Animated.View
//           {...this.panResponder.panHandlers}
//           style={[
//             styles.subView,
//             { transform: [{ translateY: this.state.translateValue }] },
//           ]}
//         >
//           <TouchableOpacity
//             style={styles.closeButtonContainer}
//             onPress={() => {
//               this.toggleDetails(false);
//             }}
//           >
//             <View style={styles.closeButton} />
//           </TouchableOpacity>
//           <View style={styles.detailsContainer}>
//             <Text style={styles.detailsText}>Some random product details</Text>
//           </View>
//         </Animated.View>
//       </Fragment>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   mainView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#B5F6F8",
//   },
//   openButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: 100,
//     height: 40,
//     backgroundColor: "#5B87E5",
//     borderRadius: 30,
//   },
//   openButtonText: {
//     fontSize: 12,
//     color: "white",
//   },
//   subView: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "white",
//     borderTopLeftRadius: 32,
//     borderTopRightRadius: 32,
//     height: 200,
//   },
//   closeButtonContainer: {
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 18,
//     paddingBottom: 12,
//   },
//   closeButton: {
//     height: 7,
//     width: 62,
//     backgroundColor: "#D8D8D8",
//     borderRadius: 3.5,
//   },
//   detailsContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   detailsText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#4A4A4A",
//   },
// });

// export default App;
