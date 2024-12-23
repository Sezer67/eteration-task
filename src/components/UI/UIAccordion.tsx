import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Accordion from 'react-native-collapsible/Accordion'
import UIText from './UIText';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Section {
    title: string;
    content: string;
}

type Props = {
    sections: Section[];
}

const UIAccordion: React.FC<Props> = ({sections}) => {

    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [activeSectionTitle, setActiveSectionTitle] = useState<string | undefined>();

    const renderContent = (section: Section) => {
        return (
            <View style={styles.contentContainer}>
                <UIText style={{ color: '#b2b2b2' }}>{section.content}</UIText>
            </View>
        )
    }

    const renderHeader = (section: Section) => {
        return (
            <View style={styles.titleContainer}>
                <UIText style={{ fontWeight: '600' }}>{section.title}</UIText>
                <Icon name={activeSectionTitle === section.title ? 'minus' : 'plus'} size={18} color={'black'} />
            </View>
        )
    }

    const onChange = (indexes: number[]) => {
        setActiveSections(indexes);
        if(indexes[0] !== undefined) {
            const activeSection = sections[indexes[0]];
            setActiveSectionTitle(activeSection.title);    
        } else {
            setActiveSectionTitle(undefined);
        }
    }


  return (
    <Accordion 
        sections={sections}
        activeSections={activeSections}
        onChange={onChange}
        renderContent={renderContent}
        renderHeader={renderHeader}
        expandMultiple={false}
        touchableComponent={TouchableOpacity}
        touchableProps={{ activeOpacity: 0.65 }}
    />
  )
}

export default UIAccordion

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 6
    },
    contentContainer: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingLeft: 8,
        marginBottom: 4,
    }
})