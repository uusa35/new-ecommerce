export default function (sideBarOpen = false, action) {
    switch (action.type) {
        case 'ENABLE_SIDE_BAR':
            return true;
        case 'DISABLE_SIDE_BAR':
            return true;
        default:
            return sideBarOpen;
    }
}
