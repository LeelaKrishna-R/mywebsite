---
title: "A Day in my Life"
date: "2025-08-27"
author: "Leelakrishna Ravuri"
readingTime: "3 min"
---

## ☀️ Morning: Coffee, Code, and Classes
The day of an AI grad student at **UNT** usually starts early (well… depending on how late the last coding session went 🤓).  
After a strong cup of ☕, I dive into:  

- Reviewing notes from the previous day 📓  
- Reading fresh research papers on **transformers** or **reinforcement learning**  
- Preparing for the first class (usually around 9 AM)  

A typical **schedule snippet** looks like this:

```yaml
schedule:
  - 9:00am: Neural Networks & Deep Learning (lecture)
  - 11:00am: Probability & Statistics for Data Science
  - 12:30pm: Lunch 🍜 + campus coffee refill
```

---

## 🎓 Midday: Lectures & Labs
Lectures are where theory gets broken down. Professors at UNT often mix **math-heavy concepts** with **real-world AI applications**.  

- *Neural Networks* → breaking apart backpropagation on the whiteboard 🧮  
- *Data Analysis & Modeling* → using **Python (NumPy, Pandas)** for real datasets 📊  
- *Machine Learning Lab* → experimenting with GPUs in **Colab / local clusters** ⚡  

A glimpse of the **kind of code** we run in labs:  

```python
import torch
import torch.nn as nn

class TinyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(10, 2)

    def forward(self, x):
        return self.fc(x)

model = TinyNet()
print("Parameters:", sum(p.numel() for p in model.parameters()))
```

---

## 🍔 Afternoon: Projects & Collaboration
By afternoon, the focus shifts to **projects**. Collaboration is big:  

- Working in groups on **NLP assignments** 🤖  
- Debugging GPU memory errors (yes, again 😅)  
- Sharing findings in Slack/Discord groups with classmates  

Example project:  
> *Training a BERT-based model for sentiment analysis on movie reviews* 🎬  

We also spend time in the **Discovery Park labs**, which stay buzzing with students building crazy things — from **autonomous drones** 🚁 to **AI-powered chatbots** 💬.

---

## 🌆 Evening: Research, Gym, and Reflection
Evenings are about balance:  

- Gym 🏋️ or basketball at the UNT Rec Center  
- Reading **arXiv papers** 📑 (the rabbit hole never ends)  
- Personal coding (side projects like my portfolio 🚀)  

At night, I usually plan out tasks for tomorrow:  

```bash
todo:
  - Finish CNN assignment (due Friday)
  - Prep slides for "Ethics in AI" seminar
  - Push commits to GitHub (portfolio + class repo)
```

---

## 🎯 Takeaways
Being an **AI Master's student at UNT** is both **intense and rewarding**:  

- You balance **theory-heavy lectures** with **hands-on labs**  
- Projects push you to **apply AI in real-world domains**  
- Community is strong — peers become collaborators and friends  

It’s not just about surviving the workload, it’s about **thriving in curiosity**. Every day brings new challenges, and every night ends with the excitement of what’s next in the world of AI 🚀.

![UNT Campus](images/unt_campus.jpg)