sim_card.active!({reason: "运营要求恢复状态"})

cycle = sim_card.sim_cards_terminal_products.first.cycle
start_time = sim_card.sim_cards_terminal_products.first.effective_date
end_time =   start_time.end_of_month+ (cycle.to_i-1).month
sim_card.sim_card_extend.update(current_expiration_date: end_time)
sim_card.sim_cards_terminal_products.first.update(expiration_date: end_time)

sim_card.sim_card_extend.update(suspend_type: 'manual')

SimCardEvent.create_event_log("modify_allocation_params",sim_card,'user',operator.id,{content: '应运营需求，将卡从提请销卡状态恢复,并恢复原始套餐周期!'})


sim_card = SimCard.find_by_iccid('898604512419C0745945').update(internal_status: "stopped")
sim_card = SimCard.find_by_iccid('898604512419C0745945').active!({reason: "将卡状态变为激活,用于处理销卡后的数据变更!"})
SimCardEvent.create_event_log("modify_allocation_params",sim_card,'user',operator.id,{content: '应运营需求，将卡从销卡状态中恢复!'})
