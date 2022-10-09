import { Button } from 'antd';

const ActionBuilder = (actions, actionHandler, loading = false, record = {}) => {
    return (actions || []).map((action) => {
        if (action.component === 'button') {
            return (
                <Button
                    key={action.text}
                    type={action.type}
                    onClick={() => {
                        actionHandler(action, record);
                    }}
                    loading={loading}
                >
                    {action.text}
                </Button>
            );
        }
        return null;
    });
};
export default ActionBuilder
