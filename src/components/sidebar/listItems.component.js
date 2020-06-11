import React from 'react';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';

import MenuIconComponent from "../ui/menu-icon/menuIcon.component";

import {useDispatch, useSelector} from "react-redux";
import {setOpen, setClose} from "../ui/sub-menu/subMenuSlicer";
import {setCurrent, getCurrent} from "../ui/sub-menu/subMenuSlicer";

const ListItems = () => {
    const dispatch = useDispatch();
    const current = useSelector(getCurrent);

    const setCurrentMenu = (name) => {
        if (current === name) {
            dispatch(setCurrent(null));
            dispatch(setClose());
        } else {
            dispatch(setCurrent(name));
            dispatch(setOpen());
        }
    }

    return (
        <div id="sideBar">
            <ListItem button onClick={() => {
                setCurrentMenu('paper_type');
            }}>
                <MenuIconComponent title="Papel" subtitle="Crytal Brilho">
                    <Icon style={{fontSize: 40, color: 'grey'}}>photo_filter</Icon>
                </MenuIconComponent>
            </ListItem>
            <ListItem button onClick={() => {
                setCurrentMenu('paper_size');
            }}>
                <MenuIconComponent title="Tamanho" subtitle="15x20">
                    <Icon style={{fontSize: 40, color: 'grey'}}>photo_size_select_large</Icon>
                </MenuIconComponent>
            </ListItem>
            <ListItem button onClick={() => {
                setCurrentMenu('auto_optimization');
            }}>
                <MenuIconComponent title="Auto otimização" subtitle="Desligado">
                    <Icon style={{fontSize: 40, color: 'grey'}}>assistant</Icon>
                </MenuIconComponent>
            </ListItem>
        </div>
    );
}

export default ListItems;
