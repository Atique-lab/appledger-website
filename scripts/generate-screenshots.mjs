import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const executablePath = fs.existsSync(edgePath) ? edgePath : (fs.existsSync(chromePath) ? chromePath : null);

if (!executablePath) {
  console.error('Neither Edge nor Chrome executable found on host system.');
  process.exit(1);
}

const htmlPath = 'file:///C:/Experimental_Lab/Ledger/index.html';
const outputDir = 'C:\\Experimental_Lab\\Ledger\\website-nextjs\\public\\images\\screenshots';

async function captureScreenshots() {
  console.log(`Launching browser using ${executablePath}...`);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: ['--allow-file-access-from-files', '--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  console.log(`Navigating to ${htmlPath}...`);
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // 1. Setup mock active app state with 5-tier role and mock data
  await page.evaluate(() => {
    // Hide auth screen and show main app screen
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    document.getElementById('app-screen').classList.add('active');

    // Set mock profile
    window.currentProfile = {
      id: 'mock-ceo-id',
      display_name: 'Atique Shaikh',
      email: 'shaikhatique693@gmail.com',
      role: 'ceo',
      organization_id: 'mock-org-id'
    };

    // Make management section visible
    const leadSec = document.getElementById('team-lead-section');
    if (leadSec) leadSec.style.display = 'block';
    const ceoBtn = document.getElementById('ceo-dashboard-btn');
    if (ceoBtn) ceoBtn.style.display = 'flex';
  });

  // Helper to hide all containers
  const hideAll = async () => {
    await page.evaluate(() => {
      document.querySelectorAll('.task-view-container').forEach(c => c.style.display = 'none');
    });
  };

  // SCREENSHOT 1: Role / Permission & Admin Console View
  console.log('Capturing Screenshot 1: 5-Tier Role & Admin Console...');
  await hideAll();
  await page.evaluate(() => {
    const adminView = document.getElementById('admin-view-container');
    if (adminView) adminView.style.display = 'block';
    const treeWrapper = document.getElementById('admin-tree-wrapper');
    if (treeWrapper) {
      treeWrapper.innerHTML = `
        <div style="background: #FAF7F0; border: 1px solid #E5E0D5; border-radius: 12px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid #E5E0D5; padding-bottom: 1rem;">
            <div>
              <h3 style="font-family: Fraunces, serif; font-size: 1.35rem; margin: 0;">Organization Roster & 5-Tier Authorization Matrix</h3>
              <p style="color: #7C7567; font-size: 0.9rem; margin-top: 4px;">Apex Operations Group • Multi-Tenant Org Code: <code>APEX-8842</code></p>
            </div>
            <span style="background: #EBF3EA; color: #2D5A27; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">Active Subscription: Enterprise 100 Tiers</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
            <thead>
              <tr style="border-bottom: 2px solid #E5E0D5; color: #4A453A;">
                <th style="padding: 10px;">Tier</th>
                <th style="padding: 10px;">User / Member Name</th>
                <th style="padding: 10px;">Assigned Role</th>
                <th style="padding: 10px;">Department / Squad</th>
                <th style="padding: 10px;">System Scope</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #EFEAE1;">
                <td style="padding: 12px 10px;"><span style="background:#2D5A27; color:#FFF; padding:3px 10px; border-radius:12px; font-weight:bold; font-size:0.75rem;">Tier 1</span></td>
                <td style="padding: 12px 10px;"><strong>Shaikh Atique</strong><br><span style="color:#7C7567; font-size:0.8rem;">shaikhatique693@gmail.com</span></td>
                <td style="padding: 12px 10px;"><span style="background:#EBF3EA; color:#2D5A27; padding:4px 10px; border-radius:6px; font-weight:600;">CEO / Founder</span></td>
                <td style="padding: 12px 10px;">Executive Office</td>
                <td style="padding: 12px 10px;"><span style="color:#2D5A27; font-weight:600;">Executive Oversight (Full)</span></td>
              </tr>
              <tr style="border-bottom: 1px solid #EFEAE1;">
                <td style="padding: 12px 10px;"><span style="background:#C05C3B; color:#FFF; padding:3px 10px; border-radius:12px; font-weight:bold; font-size:0.75rem;">Tier 2</span></td>
                <td style="padding: 12px 10px;"><strong>Sarah Jenkins</strong><br><span style="color:#7C7567; font-size:0.8rem;">sarah@apexops.com</span></td>
                <td style="padding: 12px 10px;"><span style="background:#FBF0EB; color:#C05C3B; padding:4px 10px; border-radius:6px; font-weight:600;">Ops Admin</span></td>
                <td style="padding: 12px 10px;">IT & Infrastructure</td>
                <td style="padding: 12px 10px;"><span style="color:#C05C3B; font-weight:600;">Full System Control</span></td>
              </tr>
              <tr style="border-bottom: 1px solid #EFEAE1;">
                <td style="padding: 12px 10px;"><span style="background:#2B6CB0; color:#FFF; padding:3px 10px; border-radius:12px; font-weight:bold; font-size:0.75rem;">Tier 3</span></td>
                <td style="padding: 12px 10px;"><strong>Marcus Vance</strong><br><span style="color:#7C7567; font-size:0.8rem;">marcus@apexops.com</span></td>
                <td style="padding: 12px 10px;"><span style="background:#EBF8FF; color:#2B6CB0; padding:4px 10px; border-radius:6px; font-weight:600;">Dept Manager</span></td>
                <td style="padding: 12px 10px;">Engineering Squad</td>
                <td style="padding: 12px 10px;">Department Allocation</td>
              </tr>
              <tr style="border-bottom: 1px solid #EFEAE1;">
                <td style="padding: 12px 10px;"><span style="background:#6B46C1; color:#FFF; padding:3px 10px; border-radius:12px; font-weight:bold; font-size:0.75rem;">Tier 4</span></td>
                <td style="padding: 12px 10px;"><strong>Alex Mercer</strong><br><span style="color:#7C7567; font-size:0.8rem;">alex@apexops.com</span></td>
                <td style="padding: 12px 10px;"><span style="background:#FAF5FF; color:#6B46C1; padding:4px 10px; border-radius:6px; font-weight:600;">Team Lead</span></td>
                <td style="padding: 12px 10px;">Backend Services</td>
                <td style="padding: 12px 10px;">Sprint & Task Escalation</td>
              </tr>
              <tr style="border-bottom: 1px solid #EFEAE1;">
                <td style="padding: 12px 10px;"><span style="background:#718096; color:#FFF; padding:3px 10px; border-radius:12px; font-weight:bold; font-size:0.75rem;">Tier 5</span></td>
                <td style="padding: 12px 10px;"><strong>Client Auditor (Guest)</strong><br><span style="color:#7C7567; font-size:0.8rem;">auditor@clientpartner.com</span></td>
                <td style="padding: 12px 10px;"><span style="background:#EDF2F7; color:#4A5568; padding:4px 10px; border-radius:6px; font-weight:600;">Guest Client</span></td>
                <td style="padding: 12px 10px;">External Review</td>
                <td style="padding: 12px 10px;"><span style="color:#D69E2E; font-weight:600;">Read-Only Sandbox</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
  });

  await page.screenshot({ path: path.join(outputDir, 'screenshot-1.png'), fullPage: false });

  // SCREENSHOT 2: "Request to Action" Escalation Inbox
  console.log('Capturing Screenshot 2: Request to Action Escalation Inbox...');
  await hideAll();
  await page.evaluate(() => {
    const inboxView = document.getElementById('inbox-view-container');
    if (inboxView) inboxView.style.display = 'block';
    const wrapper = document.getElementById('inbox-requests-wrapper');
    if (wrapper) {
      wrapper.innerHTML = `
        <div style="background: #FFF5F2; border: 1.5px solid #C05C3B; border-radius: 12px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
              <span style="background: #C05C3B; color: #FFF; padding: 3px 10px; border-radius: 12px; font-weight: 700; font-size: 0.75rem;">URGENT ESCALATION SIGNAL</span>
              <h3 style="font-family: Fraunces, serif; font-size: 1.25rem; margin: 0.5rem 0 0.25rem 0;">Payment Gateway API Secret Key Timeout</h3>
              <p style="color: #7C7567; font-size: 0.85rem; margin: 0;">Task ID: <code>TSK-4092</code> • Originator: Marcus Vance (Tech Lead) • Escalated 12 mins ago</p>
            </div>
            <span style="background: #FAF7F0; border: 1px solid #E5E0D5; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">Auto-Routed to Supervisor</span>
          </div>

          <div style="background: #FFF; border: 1px solid #F3EFE6; padding: 1rem; border-radius: 8px; margin-bottom: 1.25rem;">
            <strong style="color: #C05C3B; font-size: 0.85rem;">REASON FOR ESCALATION:</strong>
            <p style="color: #2C2C2C; font-size: 0.95rem; margin-top: 4px; line-height: 1.5;">
              "Staging environment API credentials failed authentication after vendor security key rotation. Blocked waiting for DevOps Lead sign-off before production deploy."
            </p>
          </div>

          <div style="display: flex; gap: 1rem;">
            <button style="background: #2D5A27; color: #FFF; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.9rem;">Approve Priority Reroute →</button>
            <button style="background: #FAF7F0; border: 1px solid #C6BFB3; color: #2C2C2C; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.9rem;">Reassign Supervisor</button>
          </div>
        </div>

        <div style="background: #FAF7F0; border: 1px solid #E5E0D5; border-radius: 12px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <div>
              <span style="background: #2B6CB0; color: #FFF; padding: 3px 10px; border-radius: 12px; font-weight: 700; font-size: 0.75rem;">SLA EXTENSION REQUEST</span>
              <h3 style="font-family: Fraunces, serif; font-size: 1.15rem; margin: 0.4rem 0 0.2rem 0;">Audit Compliance Document Sign-Off</h3>
              <p style="color: #7C7567; font-size: 0.85rem; margin: 0;">Task ID: <code>TSK-3891</code> • Originator: Sarah Jenkins (Ops Admin)</p>
            </div>
            <span style="background: #EBF8FF; color: #2B6CB0; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">Pending Review</span>
          </div>
        </div>
      `;
    }
  });

  await page.screenshot({ path: path.join(outputDir, 'screenshot-2.png'), fullPage: false });

  // SCREENSHOT 3: CEO Executive Dashboard
  console.log('Capturing Screenshot 3: CEO Executive Dashboard...');
  await hideAll();
  await page.evaluate(() => {
    const ceoView = document.getElementById('ceo-dashboard-container');
    if (ceoView) ceoView.style.display = 'block';

    const metricsRow = document.getElementById('ceo-metrics-row');
    if (metricsRow) {
      metricsRow.innerHTML = `
        <div style="background: #FAF7F0; border: 1px solid #E5E0D5; padding: 1.25rem; border-radius: 10px;">
          <span style="font-size: 0.8rem; color: #7C7567; font-weight: 600; text-transform: uppercase;">Active Projects</span>
          <div style="font-size: 2rem; font-family: Fraunces, serif; color: #2D5A27; font-weight: bold; margin-top: 4px;">48</div>
          <span style="font-size: 0.8rem; color: #2D5A27;">↑ 12% vs last month</span>
        </div>
        <div style="background: #FAF7F0; border: 1px solid #E5E0D5; padding: 1.25rem; border-radius: 10px;">
          <span style="font-size: 0.8rem; color: #7C7567; font-weight: 600; text-transform: uppercase;">Open Escalations</span>
          <div style="font-size: 2rem; font-family: Fraunces, serif; color: #C05C3B; font-weight: bold; margin-top: 4px;">1</div>
          <span style="font-size: 0.8rem; color: #C05C3B;">Requires Lead Attention</span>
        </div>
        <div style="background: #FAF7F0; border: 1px solid #E5E0D5; padding: 1.25rem; border-radius: 10px;">
          <span style="font-size: 0.8rem; color: #7C7567; font-weight: 600; text-transform: uppercase;">SLA Completion Rate</span>
          <div style="font-size: 2rem; font-family: Fraunces, serif; color: #2D5A27; font-weight: bold; margin-top: 4px;">94.2%</div>
          <span style="font-size: 0.8rem; color: #2D5A27;">Target: 90%</span>
        </div>
      `;
    }

    const deptList = document.getElementById('ceo-departments-list');
    if (deptList) {
      deptList.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF; padding: 1rem; border-radius: 8px; border: 1px solid #EFEAE1;">
          <div><strong>Engineering Squad</strong><br><span style="color:#7C7567; font-size:0.8rem;">Lead: Marcus Vance</span></div>
          <div><span style="color:#2D5A27; font-weight:bold;">24 Tasks Completed</span> (96% SLA)</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF; padding: 1rem; border-radius: 8px; border: 1px solid #EFEAE1;">
          <div><strong>Operations & Compliance</strong><br><span style="color:#7C7567; font-size:0.8rem;">Lead: Sarah Jenkins</span></div>
          <div><span style="color:#2D5A27; font-weight:bold;">18 Tasks Completed</span> (92% SLA)</div>
        </div>
      `;
    }

    const workloadList = document.getElementById('ceo-workload-list');
    if (workloadList) {
      workloadList.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; background: #FFF; padding: 0.75rem 1rem; border-radius: 6px;">
          <span style="width: 120px; font-weight: 600;">Marcus Vance</span>
          <div style="flex: 1; background: #EFEAE1; height: 10px; border-radius: 5px; overflow: hidden;">
            <div style="width: 65%; background: #2D5A27; height: 100%;"></div>
          </div>
          <span style="font-size: 0.85rem; font-weight: 600; color: #7C7567;">7 Tasks Open</span>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem; background: #FFF; padding: 0.75rem 1rem; border-radius: 6px;">
          <span style="width: 120px; font-weight: 600;">Sarah Jenkins</span>
          <div style="flex: 1; background: #EFEAE1; height: 10px; border-radius: 5px; overflow: hidden;">
            <div style="width: 45%; background: #2B6CB0; height: 100%;"></div>
          </div>
          <span style="font-size: 0.85rem; font-weight: 600; color: #7C7567;">5 Tasks Open</span>
        </div>
      `;
    }
  });

  await page.screenshot({ path: path.join(outputDir, 'screenshot-3.png'), fullPage: false });

  // SCREENSHOT 4: Guest (Client) Access Grant Screen
  console.log('Capturing Screenshot 4: Guest Client Access Screen...');
  await hideAll();
  await page.evaluate(() => {
    const adminView = document.getElementById('admin-view-container');
    if (adminView) adminView.style.display = 'block';
    const treeWrapper = document.getElementById('admin-tree-wrapper');
    if (treeWrapper) {
      treeWrapper.innerHTML = `
        <div style="background: #FAF7F0; border: 1.5px solid #2B6CB0; border-radius: 12px; padding: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid #E5E0D5; padding-bottom: 1rem;">
            <div>
              <span style="background: #EDF2F7; color: #2B6CB0; padding: 4px 10px; border-radius: 12px; font-weight: 700; font-size: 0.75rem;">ISOLATED SANDBOX SECURITY</span>
              <h3 style="font-family: Fraunces, serif; font-size: 1.35rem; margin: 0.4rem 0 0 0;">Task-Level Guest Access Provisioning</h3>
            </div>
            <span style="background: #EBF8FF; color: #2B6CB0; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">Enforced by PostgreSQL RLS</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div style="background: #FFF; padding: 1.25rem; border-radius: 8px; border: 1px solid #EFEAE1;">
              <h4 style="margin: 0 0 0.75rem 0; font-size: 1rem; color: #2C2C2C;">1. Select External Client / Guest User</h4>
              <div style="padding: 10px; background: #FAF7F0; border-radius: 6px; border: 1px solid #E5E0D5; margin-bottom: 0.75rem;">
                <strong>Client Auditor (Guest Account)</strong><br>
                <span style="font-size: 0.8rem; color: #7C7567;">auditor@clientpartner.com</span>
              </div>
              <p style="font-size: 0.8rem; color: #7C7567; margin: 0;">
                Guest users have <strong>zero access</strong> to internal discussion notes, employee performance metrics, or other team boards.
              </p>
            </div>

            <div style="background: #FFF; padding: 1.25rem; border-radius: 8px; border: 1px solid #EFEAE1;">
              <h4 style="margin: 0 0 0.75rem 0; font-size: 1rem; color: #2C2C2C;">2. Granted Deliverable Scope (Read-Only)</h4>
              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
                <li style="display: flex; align-items: center; gap: 6px; color: #2D5A27; font-weight: 600;">✓ Task #104: Q3 Final Milestone Deliverable (Read-Only)</li>
                <li style="display: flex; align-items: center; gap: 6px; color: #2D5A27; font-weight: 600;">✓ Task #108: Security Compliance Checklist (Read-Only)</li>
                <li style="display: flex; align-items: center; gap: 6px; color: #A0AEC0;">🔒 Internal Core Backend Migration (Hidden by RLS)</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }
  });

  await page.screenshot({ path: path.join(outputDir, 'screenshot-4.png'), fullPage: false });

  // SCREENSHOT 5: Per-Team Workflow Template View
  console.log('Capturing Screenshot 5: Per-Team Workflow Template View...');
  await hideAll();
  await page.evaluate(() => {
    const adminView = document.getElementById('admin-view-container');
    if (adminView) adminView.style.display = 'block';
    const treeWrapper = document.getElementById('admin-tree-wrapper');
    if (treeWrapper) {
      treeWrapper.innerHTML = `
        <div style="background: #FAF7F0; border: 1.5px solid #2D5A27; border-radius: 12px; padding: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid #E5E0D5; padding-bottom: 1rem;">
            <div>
              <span style="background: #EBF3EA; color: #2D5A27; padding: 4px 10px; border-radius: 12px; font-weight: 700; font-size: 0.75rem;">WORKFLOW PIPELINE ENGINE</span>
              <h3 style="font-family: Fraunces, serif; font-size: 1.35rem; margin: 0.4rem 0 0 0;">Per-Team Custom Workflow Templates</h3>
            </div>
            <span style="background: #2D5A27; color: #FFF; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">Configurable Stage Rules</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;">
            <div style="background: #FFF; border: 2px solid #2D5A27; padding: 1.25rem; border-radius: 10px; box-shadow: 0 4px 12px rgba(45,90,39,0.1);">
              <span style="background: #EBF3EA; color: #2D5A27; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">ENGINEERING SQUAD</span>
              <h4 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.1rem;">Tech Release Pipeline</h4>
              <p style="font-size: 0.8rem; color: #7C7567; margin-bottom: 1rem;">Backlog → Code Review → Staging QA → Deployment</p>
              <div style="display: flex; gap: 4px; height: 6px; border-radius: 3px; overflow: hidden; background: #EFEAE1;">
                <div style="width: 25%; background: #2D5A27;"></div>
                <div style="width: 35%; background: #C05C3B;"></div>
                <div style="width: 40%; background: #2B6CB0;"></div>
              </div>
            </div>

            <div style="background: #FFF; border: 1px solid #EFEAE1; padding: 1.25rem; border-radius: 10px;">
              <span style="background: #FBF0EB; color: #C05C3B; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">SALES & CLIENT ONBOARDING</span>
              <h4 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.1rem;">Sales Lead Funnel</h4>
              <p style="font-size: 0.8rem; color: #7C7567; margin-bottom: 1rem;">Lead Intake → Proposal → SLA Review → Signed</p>
              <div style="display: flex; gap: 4px; height: 6px; border-radius: 3px; overflow: hidden; background: #EFEAE1;">
                <div style="width: 40%; background: #C05C3B;"></div>
                <div style="width: 30%; background: #D69E2E;"></div>
                <div style="width: 30%; background: #2D5A27;"></div>
              </div>
            </div>

            <div style="background: #FFF; border: 1px solid #EFEAE1; padding: 1.25rem; border-radius: 10px;">
              <span style="background: #EBF8FF; color: #2B6CB0; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">OPERATIONS & LEGAL</span>
              <h4 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.1rem;">Audit & Compliance Chain</h4>
              <p style="font-size: 0.8rem; color: #7C7567; margin-bottom: 1rem;">Drafting → Partner Inspection → Executive Approval</p>
              <div style="display: flex; gap: 4px; height: 6px; border-radius: 3px; overflow: hidden; background: #EFEAE1;">
                <div style="width: 50%; background: #2B6CB0;"></div>
                <div style="width: 50%; background: #2D5A27;"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });

  await page.screenshot({ path: path.join(outputDir, 'screenshot-5.png'), fullPage: false });

  console.log('✅ All 5 screenshots generated successfully at 1440x900 resolution!');
  await browser.close();
}

captureScreenshots().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
