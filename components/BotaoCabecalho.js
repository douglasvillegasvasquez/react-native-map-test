import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'

import cores from '../cores/cores'

export default BotaoCabecalho = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={24}
            
        />
    );
};