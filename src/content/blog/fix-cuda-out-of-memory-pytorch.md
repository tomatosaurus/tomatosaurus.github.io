---
title: 'Fixing "CUDA out of memory" in PyTorch When nvidia-smi Shows Free Memory'
description: 'Why PyTorch raises CUDA OOM even though the GPU looks half empty, and a checklist to fix it: fragmentation, cached allocator, and leaked references.'
pubDate: 2026-09-30
category: engineering
tags: ['pytorch', 'cuda', 'machine-learning', 'troubleshooting']
---

> **Sample post.** Replace or delete this file (`src/content/blog/fix-cuda-out-of-memory-pytorch.md`) — it shows the format for long-tail troubleshooting articles.

## The error

```text
torch.OutOfMemoryError: CUDA out of memory. Tried to allocate 2.00 GiB.
GPU 0 has a total capacity of 23.65 GiB of which 3.12 GiB is free.
Of the allocated memory 17.80 GiB is allocated by PyTorch, and 1.95 GiB is reserved but unallocated.
```

## Environment

- PyTorch 2.x, CUDA 12.x
- Single GPU training, mixed precision

## Root cause

The line that matters is **"reserved but unallocated"**. PyTorch's caching allocator holds memory it
has freed, but that memory is split into blocks too small for the 2 GiB request — i.e. fragmentation.

## Fix

1. Let the allocator grow segments instead of fragmenting:

   ```bash
   export PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True
   ```

2. Make sure you are not keeping the graph alive by accumulating tensors:

   ```python
   running_loss += loss.item()  # not `running_loss += loss`
   ```

3. Inspect what is actually holding memory:

   ```python
   print(torch.cuda.memory_summary(abbreviated=True))
   ```

## Takeaway

When OOM reports lots of *reserved but unallocated* memory, fix fragmentation before shrinking your batch size.
