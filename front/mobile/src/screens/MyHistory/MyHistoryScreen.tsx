import React, {useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Animated} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {colors} from '../../components/common/colors';
import {LikeScreen} from './LikeScreen';
import {DimensionTheme} from '../../components/common/shared';
import {StatisticsScreen} from './StatisticsScreen';

const TabSection = styled.View`
  flex-direction: row;
  justfiy-contents: space-between;
  align-items: center;
  margin-top: ${DimensionTheme.height(10)};
  margin-left: ${DimensionTheme.width(16)};
  margin-bottom: ${DimensionTheme.height(25)};
`;

const TabItemSection = styled.TouchableOpacity`
  align-items: center;
  margin-right: ${DimensionTheme.width(20)};
  border-bottom: 1rem solid;
  min-width: ${DimensionTheme.width(70)};
  height: ${DimensionTheme.height(30)};
`;

export const MyHistoryScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'like', title: 'LIKE'},
    {key: 'bookmark', title: 'BOOKMARK'},
    {key: 'recent', title: 'RECENT'},
    {key: 'statistics', title: 'STATISTICS'},
  ]);

  const _handleIndexChange = (index: number) => setIndex(index);

  const _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <TabSection>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });
          const borderColor =
            index === i ? colors.borderpurple : colors.graydark;
          const borderWidth = index === i ? 3 : 1;

          return (
            <TabItemSection
              style={{
                borderBottomColor: borderColor,
                borderBottomWidth: borderWidth,
              }}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
            </TabItemSection>
          );
        })}
      </TabSection>
    );
  };

  const _renderScene = SceneMap({
    like: LikeScreen,
    bookmark: LikeScreen,
    recent: LikeScreen,
    statistics: StatisticsScreen,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={_renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={_handleIndexChange}
    />
  );
};
