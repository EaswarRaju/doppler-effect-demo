import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './app.scss';
import Drawing from '../drawing/drawing';
import { colorConstants, MIN_VELOCITY, MAX_VELOCITY } from '../../common/constants';
import { translateVelocityToColor } from '../../common/utils';
import Input from '../input/input';
import { updateVelocity } from '../../actions/app-actions';
import Slider from '../slider/slider';

const App = () => {
    const dispatch = useDispatch();

    const onInputChange = value => {
        dispatch(updateVelocity(value === '' || value === '-' ? 0 : value));
    };

    const { velocity } = useSelector(state => state.appReducer);

    return (
        <div className="app-container">
            <Drawing
                drawingColor={velocity < 0 ? colorConstants.RED : colorConstants.BLUE}
                colorValue={translateVelocityToColor(velocity)}
            />
            <div className="controls">
                <Input
                    type="number"
                    min={MIN_VELOCITY}
                    max={MAX_VELOCITY}
                    label="Velocity (km/s)"
                    onChange={onInputChange}
                    value={velocity}
                />
                <Slider min={MIN_VELOCITY} max={MAX_VELOCITY} onChange={onInputChange} value={velocity} />
            </div>
        </div>
    );
};

export default App;