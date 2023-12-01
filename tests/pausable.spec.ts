import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'

import assert from 'assert';

import { pausable } from './binding/pausable'

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Now --------------------------------------------------------------------- */

set_mockup_now(new Date(Date.now()))

/* Scenario ---------------------------------------------------------------- */

describe('[Template] pausable', () => {
  it('Deploy pausable', async () => {
    await pausable.deploy({ as: alice })
  });

  it("Call unpause when paused is false should fail", async () => {
    const paused_before = await pausable.get_paused();
    assert(paused_before == false);

    await expect_to_fail(async () => {
      await pausable.unpause({ as: alice })
    }, pausable.errors.pausable_r2)
  })

  it("Call pause when pause should fail", async () => {
    const paused_before = await pausable.get_paused();
    assert(paused_before == false);

    await pausable.pause({ as: alice })

    const paused_after = await pausable.get_paused();
    assert(paused_after == true);
  })

  it("Call unpause when pause should fail", async () => {
    const paused_before = await pausable.get_paused();
    assert(paused_before == true);

    await expect_to_fail(async () => {
      await pausable.pause({ as: alice })
    }, pausable.errors.CONTRACT_PAUSED)
  })

  it("Call pause when pause should fail", async () => {
    const paused_before = await pausable.get_paused();
    assert(paused_before == true);

    await pausable.unpause({ as: alice })

    const paused_after = await pausable.get_paused();
    assert(paused_after == false);
  })

})
