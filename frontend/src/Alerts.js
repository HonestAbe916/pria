import Button from '@mui/material/Button';
import { useActionState, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Alerts() {
    const [aiResults, setAiResults] = useState(null);

    async function onSubmit(actionState, formData) {
        const query = formData.get("query");
        const result = await fetch('http://localhost:3001/api/alerts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
            })
        })
        const res = await result.json();
        setAiResults(res.response);
    }
    const [_actionState, action, isPending] = useActionState(onSubmit, null);

    return (
        <div>
            <form action={action} className='mb-8'>
                <textarea className='w-full' id="story" name="query" rows="5" cols="33"></textarea>
                <div className='flex flex-row items-center space-x-4'>
                    <Button disabled={isPending} color='secondary' variant="contained" type="submit" className=''>Submit</Button>
                    {isPending && <CircularProgress size={20} />}
                </div>
            </form>
            {aiResults && (
                <div className='flex flex-col space-y-8'>
                    <Paper className='p-8'>
                        <Typography variant='h4'>Summary</Typography>
                        <Typography variant='body1'>{aiResults.summary}</Typography>
                    </Paper>
                    {Object.keys(aiResults.alerts).map((name) => (
                         <Paper className='p-8'>
                            <Typography variant='h4'>{name}</Typography>
                            <Typography variant='body1'>{aiResults.alerts[name]}</Typography>
                        </Paper>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Alerts;
