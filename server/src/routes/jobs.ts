import { Router } from 'express';
import { prisma } from '../index';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Bulk create jobs
router.post('/', async (req, res) => {
    try {
        const { jobs } = req.body;
        const batchId = uuidv4();

        if (!Array.isArray(jobs)) {
            return res.status(400).json({ error: 'Jobs must be an array' });
        }

        const createdJobs = await Promise.all(
            jobs.map((job: any) =>
                prisma.job.create({
                    data: {
                        batchId,
                        status: 'PENDING',
                        data: JSON.stringify(job), // Store flexible data as JSON string
                        startDate: null,
                        deadline: null,
                    },
                })
            )
        );

        res.json({ message: 'Jobs created successfully', count: createdJobs.length, batchId });
    } catch (error) {
        console.error('Error creating jobs:', error);
        res.status(500).json({ error: 'Failed to create jobs' });
    }
});

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Parse JSON data back to object
        const parsedJobs = jobs.map((job: any) => ({
            ...job,
            data: JSON.parse(job.data),
        }));

        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Update job status
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const job = await prisma.job.update({
            where: { id },
            data: {
                status,
                startDate: status === 'STARTED' ? new Date() : undefined,
                deadline: status === 'STARTED' ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) : undefined, // Mock deadline: 2 days
            },
        });

        res.json(job);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Failed to update job' });
    }
});

export default router;
